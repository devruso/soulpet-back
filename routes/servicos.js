const Servico = require("../database/servico");
const { Router } = require("express");

const router = Router();

// Rota para adicionar um novo servico:
router.post("/servicos", async (req, res) => {
  const { nome, preco } = req.body;

  try {
    const novoServico = await Servico.create({ nome, preco });

    res.status(201).json(novoServico);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Não foi possível adicionar um novo serviço." });
  }
});

router.delete("/servicos/:id", async (req, res) => {
  const { id } = req.params;
  const servico = await Servico.findByPk(req.params.id);

  try {
    if (servico) {
      await servico.destroy();
      res.status(200).json({ message: "Serviço removido." });
    } else {
      res.status(404).json({ message: "Serviço não encontrado." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});


// Deletar todos os serviços
router.delete("/servicos/all", async (req, res) => {
  try {
    await Servico.destroy({ where: {} });
    res.status(200).json({ message: "Todos os serviços foram removidos." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

router.get("/servicos", async (req, res) => {
  const { nome, preco } = req.query;

  let listaServicos;

  if (nome) {
    listaServicos = await Servico.findAll({ where: { nome } });
  } else if (preco) {
    listaServicos = await Servico.findAll({ where: { preco } });
  } else {
    listaServicos = await Servico.findAll();
  }

  res.json(listaServicos);
});

// Rota para listar servico id
router.get("/servicos/:id", async (req, res) => {
  const {id} = req.params

  const servico = await Servico.findByPk(id)
  if (servico) {
    res.json(servico)
  } else {
    res.status(404).json({ message: "Pet não encontrado." });
  }
})
  
// Rota para Atualizar Registro:
router.put("/servicos/:id", async (req, res) => {
  const { nome, preco } = req.body;
  const { id } = req.params;

  try {
    const servico = await Servico.findOne({ where: { id } });
    if (servico) {
      await servico.update({ nome, preco });
      res.status(200).json({ message: "Serviço atualizado com sucesso." });
    } else {
      res
        .status(400)
        .json({ message: "Esse serviço não possui informações armazenadas" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        message: "Não foi possível atualizar as informações do serviço",
      });
  }
});

module.exports = router;
