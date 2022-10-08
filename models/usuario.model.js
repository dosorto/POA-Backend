module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("Usuario", {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, // no permite valores nulos
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false // no permite valores nulos
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false, // no permite valores nulos
        defaultValue: false // establece el valor por defecto en false
      },
      resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
    return Usuario;
  };
  