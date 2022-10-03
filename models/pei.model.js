module.exports = (sequelize, Sequelize) => {
    const PEI = sequelize.define("PEI", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        fechaInicio: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fechaFin: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isActive:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    });
    return PEI;
};