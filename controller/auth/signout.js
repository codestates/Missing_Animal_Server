module.exports = (req, res) => {
  req.session.destroy(() => {
    req.session;
  });
  res.clearCookie();
  res.status(200).json({ message: "signout" });
};
