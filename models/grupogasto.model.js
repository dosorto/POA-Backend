module.exports = (sequelize, Sequelize) => {
    const grupogasto = sequelize.define("grupogasto", {
        nombre: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        identificador: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return grupogasto;
};
