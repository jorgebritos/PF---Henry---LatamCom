const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      length: 40,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      length: 40,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: false
    },
    profile_image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      length: 100,
      allowNull: false
    }
  });
};
