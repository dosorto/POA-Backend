module.exports = (sequelize, Sequelize) => {
    const RevisionTareas = sequelize.define("revision", {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      nombre_aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: false 
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      descripcion_aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: false 
      },
      cantidad: {
        type: Sequelize.STRING,
        allowNull: true
      },

      cantidad_aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: false 
      },
      costoUnitario: {
        type: Sequelize.STRING,
        allowNull: true
      },

      costoUnitario_aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: false 
      },
      objeto_grupo: {
        type: Sequelize.STRING,
        allowNull: true
      },

      objeto_grupo_aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: false 
      },
      grupo_gasto: {
        type: Sequelize.STRING,
        allowNull: true
      },

      grupo_gasto_aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: false 
      },
      unidad_medida: {
        type: Sequelize.STRING,
        allowNull: true
      },

      unidad_medida_aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: false 
      },
      fuente: {
        type: Sequelize.STRING,
        allowNull: true
      },

      fuente_aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: false 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
  
    return RevisionTareas;
  };