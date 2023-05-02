//Model de Agendamento 
const { DataTypes } = require("sequelize");
const { connection } = require("./database");


const Agendamento = connection.define("agendamento", {
  data: { 
    type: DataTypes.DATE, 
    allowNull: false 
},
});


const Servico = require('./servico');
const Pet = require('./pet');

Pet.hasMany(Agendamento);
Servico.hasMany(Agendamento);

module.exports = Agendamento;