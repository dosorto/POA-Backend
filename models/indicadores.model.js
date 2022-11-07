module.exports = (sequelize, Sequelize) =>{
    const Indicadores = sequelize.define("indicadores", {
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

    return Indicadores;
};