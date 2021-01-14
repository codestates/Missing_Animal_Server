module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "comments",
    {
      image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nick: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
