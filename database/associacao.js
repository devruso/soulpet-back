const Servico = require('./servico');
const Pet = require('./pet');
const Agendamento = require('./agendamento');

Pet.belongsToMany(Servico, { through: Agendamento });
Servico.belongsToMany(Pet, { through: Agendamento });