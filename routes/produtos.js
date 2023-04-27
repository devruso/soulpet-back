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
    res.status(201).json({ message: "Lista de produtos:", listaProdutos });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//ROTA PARA LISTAR UM PRODUTO POR ID
router.get("/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.findOne({
      where: { id: req.params.id },
    });
    if (produto) {
      res.status(201).json({ message: "Produto encontrado:", produto });
    } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});



module.exports = router;
