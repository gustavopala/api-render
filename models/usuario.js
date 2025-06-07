import { DataTypes } from 'sequelize'

export default (sequelize) => {
  return sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })
}