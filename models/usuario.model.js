module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("Usuario", {
    username: {
      type: Sequelize.STRING,
      allowNull: false, // no permite valores nulos
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false // no permite valores nulos
    },
    idEmpleado: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idRol: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
