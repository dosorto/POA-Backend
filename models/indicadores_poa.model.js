module.exports = (sequelize, Sequelize) =>{
    const IndicadoresPoa = sequelize.define("indicadoresPoa", {
        nombre: {
           type: Sequelize.TEXT,
           allowNull: false
        },
        descripcion:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        cantidadPlanificada: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cantidadEjecutada: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        promedioAlcanzado: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          }
    });

    return IndicadoresPoa;
};