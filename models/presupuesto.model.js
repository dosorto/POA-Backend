module.exports = (sequelize, Sequelize) => {
    const presupuesto = sequelize.define("presupuesto", {
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        costounitario: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        total: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return presupuesto;
};
