module.exports = (sequelize, Sequelize) => {
    const roles_permisos = sequelize.define("roles_permisos", {
        idRol: {
            type: Sequelize.INTEGER,
  
        },
        idPermiso: {
            type: Sequelize.INTEGER,
        }
    });
    return roles_permisos;
  };