const dotenv = require("dotenv");
dotenv.config();
const { connection,authenticate } = require("./database");

const Cliente = require("./cliente");
const Endereco = require("./endereco")
const Pet = require("./pet");
const Produto = require("./produto");
 
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
async function createServico(nome,preco,dataAgenda){

}
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
            
            const primeiroProduto = await createProduto("bola","15.00","Uma bola que seu cachorro irá amar", "sim","12-25-2030","Brinquedo");
        }else{
            await connection.sync();
        }

    }catch(err){
        console.log(err);
    }
}

module.exports = initiateDB;