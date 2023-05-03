const dotenv = require("dotenv");
dotenv.config();
const { connection,authenticate } = require("./database");

//  UUID a ser utilizado em pedido
import { v4 as uuidv4 } from 'uuid';


const Cliente = require("./cliente");
const Endereco = require("./endereco")
const Pet = require("./pet");
const Produto = require("./produto");
const Agendamento = require("./agendamento");
const Servico = require("./servico");
const Pedido = require("./pedido");
 
async function createCliente(nome,email,telefone,endereco){
    const novocliente = await Cliente.create({
        nome,
        email,
        telefone,
    });
    return novocliente;
};
async function createEndereco(uf,rua,cidade,cep,numero,clienteId){
    const novoEndereco = await Endereco.create({
        uf,
        rua,
        cidade,
        cep,
        numero,
        clienteId
    })
    return novoEndereco;
}
async function createPet(nome,tipo,porte,dataNasc,clienteId){
    const novoPet = await Pet.create({
        nome,
        tipo,
        porte,
        dataNasc,
        clienteId
    })
    return novoPet;
};
async function createServico(nome,preco){
    const novoServico = await Servico.create({
        nome,
        preco
    }); 
    return novoServico;
};
async function createAgendamento(data,status,servicoId,petId){
    const novoAgendamento = await Agendamento.create({
        data,
        status,
        servicoId,
        petId  
    });
    return novoAgendamento;
};
async function createProduto(nome,preco,descricao,desconto,dataDesconto,categoria){
    const novoProduto = await Produto.create({
        nome,
        preco,
        descricao,
        desconto,
        dataDesconto,
        categoria,
    });
    return novoProduto;
};
async function createPedido(codigo,quantidade,clienteId,produtoId){
    const novoPedido= await Pedido.create({
        codigo,
        quantidade,
        clienteId,
        produtoId
    })
    return novoPedido;
};
// Funcao para iniciar o  banco de dados com dados pre-estabelecidos
async function initiateDB(){
    try{
        await authenticate(connection); 
        if(process.env.DB_FORCE === 'TRUE'){
            await connection.sync({force:true});

            const primeiroCliente= await createCliente("Bill Gates", "billgates@email.com","99999-9999"); // id 1
            const primeiroEndereco = await createEndereco("US","Rua1" ,"California","40300-000","1", 1);
            
            const segundoCliente = await createCliente("Steve Jobs","stevejob@email.com", "88888-8888"); // id 2
            const segundoEndereco = await createEndereco("FF","Rua 2","Alem","55555-000","0",2);

            const primeiroPet = await createPet("Billy", "cachorro", "medio", "05-10-2015", 1);
            const segundoPet = await createPet("Rex","cachorro", "grande", "01-01-2010", 1);
            const terceiroPet = await createPet("Margozinho", "gato","medio","07-07-2007",2);
            

            const primeiroServico = await createServico("Banho", "45.00");
            const segundoServico = await createServico("Tosa","45.00");
            const terceiroServico = await createServico("Consulta com veterinario", "120.00");

            const primeiroAgendamento = await createAgendamento("05-30-2023", true, 1, 3);
            const segundoAgendamento = await createAgendamento("06-01-2023", true, 3, 1);

            const primeiroProduto = await createProduto("bola","15.00","Uma bola que seu cachorro irá amar", "sim","12-25-2030","Brinquedo");
            const segundoProduto = await createProduto("osso", "20.00","Um osso que limpa os dentes dos dogs", "sim","10-20-2024","Alimento");

            const primeiroPedido = await createPedido(uuidv4(),100,1,1);
            const segundoPedido = await createPedido(uuidv4(),5,2,2);

        }else{
            await connection.sync();
        }

    }catch(err){
        console.log(err);
    }
}

module.exports = initiateDB;