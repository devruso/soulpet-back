const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Pedido = connection.define("pedido",{
    // UUID
    codigo: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull:false,
    }
    //  inserir o id do cliente que fez o pedido
    // inserior o id do produto
});

const Cliente = require("./cliente");
const Produto = require("./produto");

Cliente.hasMany(Pedido, {onDelete:"CASCADE"});
Produto.hasMany(Pedido, {onDelete:"CASCADE"}); 


module.exports = Pedido;