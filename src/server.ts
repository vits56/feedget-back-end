import { prisma } from './prisma';
import express from 'express';

const app = express();

app.use(express.json());

// GET = Buscar informação
// POST = Cadastrar informação
// PUT = Atualizar informação de uma entidade
// PATCH = Atualizar informação de uma única entidade
// DELETE = Deletar informação de uma entidade

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  return res.status(201).json({ data:feedback });
})

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});