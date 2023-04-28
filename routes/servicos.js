const Servico = require("../database/servico");
const{ Router} = require ("express");


const router = Router();

// Rota para adicionar um novo servico:
router.post("/servico", async (req, res) => {
    const { nome, preco } = req.body;
  
    try {
      const novoServico = await Servico.create(
        { nome, preco },
      );
  
      res.status(201).json(novoServico);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Não foi possível adicionar um novo serviço." });
    }
  });

  module.exports= router;