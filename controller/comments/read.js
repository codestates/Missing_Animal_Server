const { Comments, Users } = require("../../models");

module.exports = async (req, res) => {
  const commentInfo = await Comments.findAll({
    where: { petId: req.params.id },
    attributes: ["id", "nick", "text", "image", "createdAt", "userId"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Users,
        attributes: ["id", "username"],
      },
    ],
  });

  const petComments = commentInfo.reduce((acc, comment) => {
    if (comment.userId === 0) {
      const nonMember = {
        id: comment.id,
        nick: comment.nick,
        text: comment.text,
        image: comment.image,
        createdAt: comment.createdAt,
      };
      acc.push(nonMember);
      return acc;
    } else {
      const member = {
        id: comment.id,
        text: comment.text,
        image: comment.image,
        createdAt: comment.createdAt,
        user: {
          id: comment.user.id,
          username: comment.user.username,
        },
      };
      acc.push(member);
      return acc;
    }
  }, []);

  res.status(200).json({ petComments });
};
