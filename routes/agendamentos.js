const Agendamento = require("../database/agendamento");
const { Router } = require("express");

const router = Router();

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