const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Pedido = connection.define("pedido",{
    // ID do produto
    codigo: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    quantidade:{
        type: DataTypes.NUMBER,
        allowNull:false,
    }
})

const Cliente = require("./cliente");
const Produto = require("./produto");

Cliente.hasMany(Pedido, {onDelete: "CASCADE"});
Produto.hasMany(Pedido); 


module.exports = Pedido;