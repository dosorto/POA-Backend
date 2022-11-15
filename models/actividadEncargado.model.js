const DataTypes = require('sequelize').DataTypes;
module.exports = (sequelize, Sequelize) => {
    const ACencargados = sequelize.define("ACencargados", {

        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true,
        }

    });
    return ACencargados;
};
