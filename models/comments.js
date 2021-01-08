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
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
