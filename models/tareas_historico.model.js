
module.exports = (sequelize, Sequelize) => {
    const tareas_historico = sequelize.define("tareas_historico", {
      nombre: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      idobjeto: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      objeto: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      idgrupo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
      grupo: {
        type: Sequelize.TEXT,
        allowNull: false
      },idunidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
      unidad: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
    return tareas_historico;
  }