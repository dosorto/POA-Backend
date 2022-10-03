module.exports = (sequelize, Sequelize) =>{
    const Area = sequelize.define("area", {
        nombre:{
            type: Sequelize.STRING,
            allowNull: false
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          }
    });

    return Area;
};