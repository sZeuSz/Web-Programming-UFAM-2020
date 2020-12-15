'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Curso.init({
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:{
          args: [4,4],
          msg: "A sigla deve conter 4 caracteres"
        }
      }
    },
    nome:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:{
          args: [3,30],
          msg: "Nome entre 3 e 30 caracteres"
        }
      }
    },

    descricao: DataTypes.TEXT,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};