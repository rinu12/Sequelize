module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address_line_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_line_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.ENUM({ values: ["IN", "US", "CA"] }),
      allowNull: true,
    },
  });

  Address.associate = (models) => {
    Address.hasOne(models.Contact, {
      foreignKey: "addressId",
    });
  };

  return Address;
};
