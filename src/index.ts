import express from 'express';
import dotenv from 'dotenv';

// Importa a biblioteca da API Gemini
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Configura o uso do arquivo .env
dotenv.config();

// Inicializa o servidor Express
const app = express();
const port = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Configura o cliente da API Gemini com a chave do .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Rota principal para testar o servidor
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Rota POST para integração com a API Gemini
app.post('/api/v1/chat', async (req, res) => {
  try {
    const { prompt } = req.body; // Recebe o prompt do cliente
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Define o modelo
    const result = await model.generateContent(prompt); // Gera a resposta da API com o prompt

    res.json(result); // Retorna a resposta para o cliente
  } catch (error) {
    res.status(500).json({ error: "errormessage" }); // Retorna erros caso algo falhe
  }
});

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
