import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import express from 'express';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8273ff80deb8eb",
    pass: "a32748a4fb6943"
  }
});

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

  await transport.sendMail({
    from: 'Equipe Feedget <equipefeedget@gmail.com>',
    to: 'Bruno Duarte <bastosduartebruno@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário ${comment}</p>`,
      `<div>`,
    ].join('\n')
  })

  return res.status(201).json({ data:feedback });
})

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});