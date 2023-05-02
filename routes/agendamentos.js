const Agendamento = require("../database/agendamento");
const { Router } = require("express");

const router = Router();


// Rota GET listar agendamentos
router.get("/agendamentos", async (req, res) => {
   
    try{
        const agendamentos = await Agendamento.findAll();
        res.status(200).json(agendamentos);
    } catch(error){
        res.status(404).json({message: "Não há agendamentos."})
    }
    
  });


router.post("/agendamentos", async (req,res) =>{
    const {data, petId, clienteId} = req.body;
    try{
        const agendamento = await Agendamento.create({data, petId, clienteId});
        if(agendamento){
            res.status(201).json({message:"Agendamento feito"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Um erro ocorreu"});
    }

})

router.delete("/agendamento/:id", async (req, res) => {
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(req.params.id);
  
    try {
      if (agendamento) {
        await agendamento.destroy();
        res.status(200).json({ message: "Agendamento removido." });
      } else {
        res.status(404).json({ message: "Agendamento não encontrado." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

  router.delete("/agendamentos/all", async (req, res) => {
    try {
      await Agendamento.destroy({ where: {} });
      res.status(200).json({ message: "Todos os agendamentos foram removidos." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

module.exports = router;