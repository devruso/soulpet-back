const { Op } = require("sequelize");
const Produto = require("../database/produto");
const { Router } = require("express");

const router = Router();

// ROTA PARA ADICIONAR NOVO PRODUTO
router.post("/produtos", async (req, res) => {
  const { nome, preco, descricao, desconto, dataDesconto, categoria } =
    req.body;

  // Realiza as validações necessárias
  const categoriasValidas = [
    "Higiene",
    "Brinquedos",
    "Conforto",
    "Alimentação",
    "Medicamentos",
  ];

  if (!categoriasValidas.includes(categoria)) {
    return res
      .status(400)
      .send(
        "Informe uma categoria válida: Higiene, Brinquedos, Conforto, Alimentação, Medicamentos."
      );
  }

  if (new Date(dataDesconto) < new Date()) {
    return res
      .status(400)
      .send("Data de desconto deve ser maior que a data atual.");
  }

  if (desconto < 0 || desconto >= 100) {
    return res.status(400).send("Desconto deve ser entre 1% e 100%.");
  }

  try {
    const novoProduto = await Produto.create({
      nome,
      preco,
      descricao,
      desconto,
      dataDesconto,
      categoria,
    });
    res
      .status(201)
      .json({ message: "Produto inseriro com sucesso!", novoProduto });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// ROTA PARA LISTAR TODOS OS PRODUTOS
router.get("/produtos", async (req, res) => {
  try {
    const listaProdutos = await Produto.findAll();
    res.status(201).json(listaProdutos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// ROTA PARA LISTAR UM PRODUTO POR ID
router.get("/produto/:id", async (req, res) => {
  try {
    const produto = await Produto.findOne({
      where: { id: req.params.id },
    });
    if (produto) {
      res.status(201).json(produto);
    } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// ROTA PARA LISTAR UM PRODUTO POR NOME OU CATEGORIA
router.get("/produto", async (req, res) => {

  const { nome, categoria } = req.query;
  const where = nome ? { nome: { [Op.like]: `%${nome}%` } } : { categoria: { [Op.like]: `%${categoria}%` } };

  try {
      const produtos = await Produto.findAll({ where });

      if (produtos.length > 0) {
          res.status(200).json({ listaProdutos: produtos });
      } else {
          res.status(404).json({ message: "Nenhum produto encontrado!" });
      }

  } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
  };
});

// ROTA PARA ATUALIZAR UM PRODUTO
router.put("/produto/:id", async (req, res) => {  
  const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;  
  const { id } = req.params;

  try {
    
    const produto = await Produto.findOne({ where: { id } });
    
    if (produto) {
      await produto.update({ nome, preco, descricao, desconto, dataDesconto, categoria });
      res.status(200).json({ message: "Produto editado." });
    } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// ROTA PARA DELETAR UM PRODUTO
router.delete("/produto/:id", async (req, res) => {
  const { id } = req.params;  
  const produto = await Produto.findOne({ where: { id } });
  
  try {
    if (produto) {
      await produto.destroy();
      res.status(200).json({ message: "Produto removido." });
    } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});


module.exports = router;
