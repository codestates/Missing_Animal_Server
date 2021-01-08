module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "users",
    {
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      //   provider: {
      //     type: DataTypes.STRING(10),
      //     allowNull: false,
      //     defaultValue: 'local',
      //   },
      mobile: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
