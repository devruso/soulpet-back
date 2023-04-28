//Model de Agendamento 
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Agendamento = connection.define("agendamento", {
  data: { 
    type: DataTypes.DATE, 
    allowNull: false 
},
});

module.exports = Agendamento;