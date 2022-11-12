const DataTypes = require('sequelize').DataTypes;
module.exports = (sequelize, Sequelize) =>{
    const Resultados = sequelize.define("resultados", {
        nombre: {
           type: Sequelize.STRING,
           allowNull: false
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          }
    });

    return Resultados;
};