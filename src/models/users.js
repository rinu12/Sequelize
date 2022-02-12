const userNameVal = "^[a-zA-Z0-9_.-]*$";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: userNameVal,
          msg:
            "The Username must contain only A-Z. a-z, numbers and underscores",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email address must be valid",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validatePassword: function (password) {
          if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{,12}$/.test(
              password
            )
          ) {
            throw new Error(
              "The password must contain at least 10 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
            );
          }
        },
      },
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.Contact, {
      foreignKey: "contactId",
    });
  };
  return User;
};
