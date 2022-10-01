const DataTypes = require('sequelize').DataTypes;
module.exports = (sequelize, Sequelize) => {
    const PEI = sequelize.define("PEI", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        initialYear: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        finalYear: {
            type: DataTypes.DATEONLY,
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
