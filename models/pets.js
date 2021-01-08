module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "pets",
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      petname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      missingDate: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      reward: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
