module.exports = (sequelize, Sequelize) => {
    const Permiso = sequelize.define("permisos", {
      Permiso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Descripcion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
    return Permiso;
  };