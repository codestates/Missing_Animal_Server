require("dotenv").config();

const axios = require("axios");
const jwt = require("jsonwebtoken");
const { Users } = require("../../models");

module.exports = async (req, res) => {
  const { authorizationCode } = req.body;

  const clientID = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  const naverRequest = await axios({
    method: "post",
    url: "https://nid.naver.com/oauth2.0/token",
    headers: {
      accept: "application/json",
    },
    params: {
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: authorizationCode,
      state: "MiAn",
    },
  });

  const naverToken = naverRequest.data.access_token;

  const naverInfoRequest = await axios.get(
    `https://openapi.naver.com/v1/nid/me`,
    {
      headers: { Authorization: `Bearer ${naverToken}` },
    }
  );

  const users = await Users.findOrCreate({
    where: { email: naverInfoRequest.data.response.email },
    defaults: {
      email: naverInfoRequest.data.response.email,
      password: null,
      username: naverInfoRequest.data.response.name,
      mobile: naverInfoRequest.data.response.mobile,
    },
  });

  const [userInfo] = users;

  // console.log("userInfo:", userInfo.dataValues);
  // console.log("users:", users);

  const localToken = await jwt.sign(
    {
      id: userInfo.id,
      email: userInfo.email,
      username: userInfo.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(201).cookie("naver_token", localToken).json({
    userid: userInfo.id,
    username: userInfo.username,
    usermobile: userInfo.mobile,
    token: localToken,
  });
};
