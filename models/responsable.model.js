module.exports = (sequelize, Sequelize) => {
    const responsable = sequelize.define("responsable", {
      responsable: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
  
    return responsable;
  };


  