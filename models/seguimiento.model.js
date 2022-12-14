module.exports = (sequelize, Sequelize) => {
    const seguimiento = sequelize.define("seguimiento", {
        seguimientoTarea: {
            type: Sequelize.STRING
        },
        porcentajeIndicador: {
            type: Sequelize.STRING
        },
        fechaRealizacion: {
            type: Sequelize.DATE
        }
    });
    return seguimiento;
  };