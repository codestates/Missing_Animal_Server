module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "petsImages",
    {
      imagePath: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: false,
    }
  );
