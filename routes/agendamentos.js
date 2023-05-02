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

module.exports = router;