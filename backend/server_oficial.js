require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configuração do PDF Parse
let pdfParse = require('pdf-parse');
if (typeof pdfParse !== 'function' && pdfParse.default) {
    pdfParse = pdfParse.default;
}

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        console.log("1. Arquivo recebido. Lendo PDF...");
        const dataBuffer = fs.readFileSync(req.file.path);
        
        const data = await pdfParse(dataBuffer); 
        let textoPDF = data.text;

        // --- CORREÇÃO AGRESSIVA DE COTA ---
        // Reduzimos para apenas 4000 caracteres para garantir que passe na cota gratuita do modelo 2.0
        const LIMITE_CARACTERES = 4000; 
        if (textoPDF.length > LIMITE_CARACTERES) {
            console.log(`   ⚠️ Texto longo (${textoPDF.length} chars). Recortando para os primeiros ${LIMITE_CARACTERES}...`);
            textoPDF = textoPDF.substring(0, LIMITE_CARACTERES);
        }
        // -----------------------------------

        console.log("2. PDF lido e recortado. Enviando para o Gemini...");

        // USANDO O MODELO QUE SABEMOS QUE EXISTE NA SUA CONTA
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const prompt = `
            Você é um gerente de projetos. Analise este texto curto de um projeto.
            Crie 3 tarefas técnicas para o JIRA.
            
            Retorne APENAS um Array JSON válido (sem markdown), onde cada objeto tem:
            - "summary": Título curto.
            - "description": Descrição técnica.
            - "issuetype": "Task"

            Texto:
            ${textoPDF}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let textResponse = response.text();
        
        // Limpeza de Markdown
        textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const tarefas = JSON.parse(textResponse);
        console.log(`3. A IA gerou ${tarefas.length} tarefas. Criando no Jira...`);

        const createdIssues = [];
        
        for (const tarefa of tarefas) {
            const jiraPayload = {
                fields: {
                    project: { key: process.env.JIRA_PROJECT_KEY },
                    summary: tarefa.summary,
                    description: tarefa.description,
                    issuetype: { name: "Task" }
                }
            };

            const auth = Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`).toString('base64');

            try {
                await axios.post(`${process.env.JIRA_DOMAIN}/rest/api/2/issue`, jiraPayload, {
                    headers: {
                        'Authorization': `Basic ${auth}`,
                        'Content-Type': 'application/json'
                    }
                });
                createdIssues.push(tarefa.summary);
            } catch (jiraError) {
                console.error(`Erro Jira [${tarefa.summary}]:`, jiraError.response?.data || jiraError.message);
            }
        }

        console.log("4. Sucesso! Tarefas processadas.");
        fs.unlinkSync(req.file.path);
        res.json({ message: 'Sucesso!', tasks: createdIssues });

    } catch (error) {
        console.error("ERRO:", error);
        
        if (error.message.includes("429")) {
             return res.status(429).json({ error: 'Muitas requisições. Espere 1 minuto e tente de novo.' });
        }
        
        res.status(500).json({ error: 'Erro ao processar', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});