const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('purchase', {
    products: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {updatedAt:false});
};
