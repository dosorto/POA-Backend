module.exports = (sequelize, Sequelize) => {
  const tareas = sequelize.define("tareas", {
    nombre: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    descripcion: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    isDelete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isPresupuesto: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return tareas;
};