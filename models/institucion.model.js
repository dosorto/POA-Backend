module.exports = (sequelize, Sequelize) => {
    const Institucion = sequelize.define("Institucion", {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    return Institucion;
  };