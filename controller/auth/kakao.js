const axios = require("axios");

module.exports = async (req, res) => {
  const { authorizationCode } = req.body;

  const redirectUri = "http://localhost:3000";
  const kakaoTokenRequest = await axios.post(
    `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}&grant_type=authorization_code`
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
  // const snsId = kakao.id;
  // const profileImage = kakao.properties.thumbnail_image;

  const userRegister = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      username,
      // snsId,
      // profileImage,
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
    .json({ message: "kakao login" });
};
