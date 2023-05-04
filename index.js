// Importações principais e variáveis de ambiente
const cors = require("cors");
require("dotenv").config(); 
const express = require("express");
const morgan = require("morgan");
const log = require("./logMongo");
const mongoose = require('mongoose');


// Configuração do App
const app = express();
app.use(express.json()); // Possibilitar transitar dados usando JSON
app.use(morgan("dev"));
mongoose.connect(process.env.MONGODB_URL);
app.use(log);

// Configurações de acesso
app.use(cors({ origin: "http://localhost:3000" }));



// Configuração do Banco de Dados
const initiateDB = require("./database/initiateDB");
initiateDB();

// Definição de Rotas
const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");
const rotasProdutos = require("./routes/produtos");
const rotasServicos = require("./routes/servicos")
const rotasPedidos = require("./routes/pedidos");
const rotasAgendamentos = require("./routes/agendamentos");
const rotaRelatorio = require("./routes/clientespdf");

// Juntar ao app as rotas dos arquivos
app.use(rotasClientes); // Configurar o grupo de rotas no app
app.use(rotasPets);
app.use(rotasProdutos);
app.use(rotasServicos);
app.use(rotasPedidos);
app.use(rotasAgendamentos);
app.use(rotaRelatorio);



// Escuta de eventos (listen)
app.listen(3001, () => {
  // Gerar as tabelas a partir do model
  // Force = apaga tudo e recria as tabelas
  console.log("Servidor rodando em http://localhost:3001/");
});
