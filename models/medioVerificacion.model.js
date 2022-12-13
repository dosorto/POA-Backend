module.exports = (sequelize, Sequelize) => {
    const verificacion = sequelize.define("verificacion", {
        url: {
            type: Sequelize.TEXT
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return verificacion;
  };