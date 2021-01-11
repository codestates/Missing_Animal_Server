require("dotenv").config();

const axios = require("axios");
const { Users } = require("../../models");

module.exports = (req, res) => {
  if (req.body.authorizationCode.length === 18) {
    const clientID = process.env.NAVER_CLIENT_ID;
    const clientSecret = process.env.NAVER_CLIENT_SECRET;

    axios({
      method: "post",
      url: "https://nid.naver.com/oauth2.0/token",
      headers: {
        accept: "application/json",
      },
      params: {
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: req.body.authorizationCode,
        state: "MiAn",
      },
    })
      .then((response) => {
        const accessToken = response.data.access_token;
        console.log("accessToken:", response.data.access_token);
        return accessToken;
      })
      .then((token) => {
        axios
          .get(`https://openapi.naver.com/v1/nid/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            // console.log("response:", response);
            const { data } = response;

            Users.findOrCreate({
              where: { email: data.response.email },
              defaults: {
                email: data.response.email,
                password: null,
                username: data.response.name,
                mobile: data.response.mobile,
              },
            }).then(([user, created]) => {
              // console.log("user:", user);
              console.log("username:", user.username);
              if (!created) {
                // 기존 Oauth 로 가입한 회원이 로그인하는 경우(DB에 정보 저장된 경우)
                return res.json({
                  userid: user.id,
                  username: user.username,
                  usermobile: user.mobile,
                  token: "Naver",
                });
              }
              res.status(201).json({ message: "naver login" });
            });
          })
          .catch((err) => {
            res.status(404);
          });
      });
  }
};
