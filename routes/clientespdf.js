const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();
const Cliente = require("../database/cliente");
const Endereco = require("../database/endereco");
const Pet = require("../database/pet");

// Rota para gerar relatório de clientes em PDF
router.get('/relatorioclientes', async (req, res) => {
  // Crie um novo documento PDF
  const doc = new PDFDocument();

  // Defina o nome do arquivo de saída e o tipo de conteúdo
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=clientes.pdf');

  // Crie um pipeline de saída e envie o documento PDF para a resposta HTTP
  const stream = doc.pipe(res);

  // Adicione conteúdo ao documento PDF
  doc.fontSize(20).text('Relatório de Clientes', { align: 'center' });
  doc.moveDown();

  // Obtenha os dados dos clientes do banco de dados (ou de qualquer outra fonte)
  const clientes = await Cliente.findAll({include: [Endereco, Pet]});

  // Adicione os dados dos clientes ao documento PDF
  clientes.forEach((cliente) => {
    doc.fontSize(14).text(`Nome: ${cliente.nome}`);
    doc.fontSize(14).text(`Email: ${cliente.email}`);
    doc.fontSize(14).text(`Telefone: ${cliente.telefone}`);
    doc.fontSize(14).text(`UF: ${cliente.endereco.uf}`);
    doc.fontSize(14).text(`Cidade: ${cliente.endereco.cidade}`);
    doc.fontSize(14).text(`Cep: ${cliente.endereco.cep}`);
    doc.fontSize(14).text(`Rua: ${cliente.endereco.rua}`);
    doc.fontSize(14).text(`Número: ${cliente.endereco.numero}`);
    doc.fontSize(14).text(`Pets: ${cliente.pets.length}`); 

        // Adicione os dados dos pets do cliente ao documento PDF
        if (cliente.pets && cliente.pets.length > 0) {
            doc.fontSize(14).text('Nome dos pets:');
            cliente.pets.forEach((pet) => {
            doc.fontSize(14).text(`- ${pet.nome} `);
            });
        }

    doc.moveDown();
  });

  // Finalize o documento PDF
  doc.end();
});

// Exporte o roteador
module.exports = router;
