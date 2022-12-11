module.exports = (sequelize, Sequelize) => {
    const empleado_depto = sequelize.define("empleado_depto", {
        idEmpleado: {
            type: Sequelize.STRING,
  
        },
        idDepto: {
            type: Sequelize.STRING,
        }
    });
    return empleado_depto;
  };