module.exports = (sequelize, Sequelize) => {
  const Planificacion = sequelize.define("planificacion", {
    trimestre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cantidad: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fechaInicio: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    fechaFin: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    isDelete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Planificacion;
};
