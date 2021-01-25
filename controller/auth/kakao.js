require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../../models");
const axios = require("axios");

module.exports = async (req, res) => {
  const { authorizationCode } = req.body;

  const kakaoTokenRequest = await axios.post(
    `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=https://missinganimal.ml&grant_type=authorization_code`
  );
  const kakaoAccessToken = kakaoTokenRequest.data.access_token;
  const kakaoUserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`,
    },
  });

  const kakao = kakaoUserInfo.data;
  const email = kakao.kakao_account.email;
  const username = kakao.properties.nickname;

  const userRegister = await Users.findOrCreate({
    where: { email },
    defaults: {
      email,
      username,
    },
  });

  const [user] = userRegister;
  const localToken = await jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res
    .status(201)
    .cookie("access_token", localToken)
    .json({ message: "kakao login", token: localToken });
};
