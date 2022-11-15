module.exports = (sequelize, Sequelize) => {
    const fuente = sequelize.define("fuente", {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false 
      },
     identificador: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    return fuente;
  };