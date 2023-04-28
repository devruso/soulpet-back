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

  router.delete("/servico/:id", async (req, res) => {
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
  
  router.delete("/servicos/all", async (req, res) => {
    try {
      await Servico.destroy({ where: {} });
      res.status(200).json({ message: "Todos os serviços foram removidos." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  

  module.exports= router;