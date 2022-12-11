module.exports = (sequelize, Sequelize) => {
    const encargadoPOA = sequelize.define("encargadoPOA", {
        idEmpleado: {
            type: Sequelize.STRING,
  
        },
        idPoa: {
            type: Sequelize.STRING,
        }
    });
    return encargadoPOA;
  };