require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');

// Configuração do PDF Parse
let pdfParse = require('pdf-parse');
if (typeof pdfParse !== 'function' && pdfParse.default) {
    pdfParse = pdfParse.default;
}

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        console.log("1. Arquivo recebido. Lendo PDF...");
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer); 
        console.log(`2. PDF lido com sucesso! Tamanho: ${data.text.length} caracteres.`);

        // --- MODO DE EMERGÊNCIA (MOCK) ---
        console.log("⚠️ API do Gemini instável (Erro 429). Usando resposta simulada para validar integração JIRA...");
        
        // Fingimos que a IA leu o PDF e gerou isso baseada nele
        // Você pode mudar esses textos se quiser testar coisas diferentes
        const tarefas = [
            {
                summary: "Análise Inicial do Documento",
                description: "Tarefa automática: O sistema leu o PDF enviado e identificou a necessidade de análise.",
                issuetype: "Task"
            },
            {
                summary: "Configuração do Back-end",
                description: "Configurar Node.js e Express conforme citado no documento PDF.",
                issuetype: "Task"
            },
            {
                summary: "Desenvolvimento Front-end",
                description: "Implementar tela em Angular com Material Design.",
                issuetype: "Task"
            }
        ];

        console.log(`3. Geramos ${tarefas.length} tarefas simuladas. Enviando para o JIRA...`);

        const createdIssues = [];
        
        // AQUI A MÁGICA ACONTECE: CONEXÃO REAL COM O JIRA
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
                console.log(`   ✅ Sucesso no Jira: ${tarefa.summary}`);
                createdIssues.push(tarefa.summary);
            } catch (jiraError) {
                console.error(`   ❌ Erro no Jira [${tarefa.summary}]:`, jiraError.response?.data || jiraError.message);
            }
        }

        console.log("4. Processo finalizado.");
        fs.unlinkSync(req.file.path);
        
        res.json({ message: 'Sucesso!', tasks: createdIssues });

    } catch (error) {
        console.error("ERRO GERAL:", error);
        res.status(500).json({ error: 'Erro ao processar', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});