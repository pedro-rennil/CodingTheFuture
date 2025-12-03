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

// ROTA 1: ANÁLISE (Mantendo o Mock para garantir funcionamento inicial)
app.post('/analyze', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        console.log("1. Arquivo recebido. Lendo PDF...");
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer); 
        
        console.log("2. Gerando sugestões de tarefas (Simulação)...");
        
        // Simulação de IA (Mock)
        const sugestoes = [
            {
                summary: "Análise de Requisitos do PDF",
                description: "Tarefa automática baseada na leitura do documento enviado.",
                issuetype: "Task"
            },
            {
                summary: "Configuração do Ambiente",
                description: "Configurar servidores e banco de dados conforme escopo.",
                issuetype: "Task"
            },
            {
                summary: "Implementação Front-end",
                description: "Desenvolver interfaces do usuário.",
                issuetype: "Task"
            }
        ];

        fs.unlinkSync(req.file.path);
        res.json(sugestoes);

    } catch (error) {
        console.error("ERRO NA ANÁLISE:", error);
        res.status(500).json({ error: 'Erro ao processar', details: error.message });
    }
});

// ROTA 2: CRIAÇÃO NO JIRA (AQUI ESTAVA O ERRO, AGORA CORRIGIDO)
app.post('/create-issues', async (req, res) => {
    try {
        // --- CORREÇÃO: Extraindo tasks E config do corpo da requisição ---
        const { tasks, config } = req.body; 
        
        // Validação: Se não vier config do front, ou se faltar dados, dá erro
        if (!config || !config.domain || !config.email || !config.token) {
            return res.status(400).json({ error: 'Credenciais do Jira não foram enviadas pelo formulário.' });
        }

        if (!tasks || !Array.isArray(tasks)) {
            return res.status(400).send('Lista de tarefas inválida.');
        }

        console.log(`3. Conectando no Jira: ${config.domain} (Usuário: ${config.email})`);

        const createdIssues = [];
        
        // --- CORREÇÃO: Usando config.email e config.token (Dinâmicos) ---
        const auth = Buffer.from(`${config.email}:${config.token}`).toString('base64');
        
        for (const tarefa of tasks) {
            const jiraPayload = {
                fields: {
                    // --- CORREÇÃO: Usando config.projectKey ---
                    project: { key: config.projectKey },
                    summary: tarefa.summary,
                    description: tarefa.description,
                    issuetype: { name: "Task" }
                }
            };

            try {
                // --- CORREÇÃO: Usando config.domain ---
                // Importante: removemos barras extras caso existam
                const baseUrl = config.domain.replace(/\/$/, ""); 
                
                await axios.post(`${baseUrl}/rest/api/2/issue`, jiraPayload, {
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

        res.json({ message: 'Sucesso!', tasks: createdIssues });

    } catch (error) {
        console.error("ERRO NO SERVIDOR:", error);
        res.status(500).json({ error: 'Erro interno', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});