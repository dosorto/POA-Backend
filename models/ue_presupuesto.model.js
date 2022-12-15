module.exports = (sequelize, Sequelize) => {
    const ue_presupuesto = sequelize.define("ue_presupuesto", {
      anio: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      fuente11: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fuente12: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fuente12B: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    return ue_presupuesto;
  };