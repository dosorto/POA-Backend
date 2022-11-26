module.exports = (sequelize, Sequelize) =>{
    const Resultados = sequelize.define("resultados", {
        nombre: {
           type: Sequelize.TEXT,
           allowNull: false
        },
        descripcion:{
            type: Sequelize.TEXT,
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