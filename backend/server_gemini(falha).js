require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configuração do PDF Parse (Proteção contra versões diferentes)
let pdfParse = require('pdf-parse');
if (typeof pdfParse !== 'function' && pdfParse.default) {
    pdfParse = pdfParse.default;
}

const app = express();
app.use(cors());
app.use(express.json()); // Importante para ler JSON do front

// Inicializa a IA com a chave do servidor (.env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const upload = multer({ dest: 'uploads/' });

// =================================================================
// ROTA 1: ANÁLISE COM IA (Lê PDF -> Manda p/ Gemini -> Retorna JSON)
// =================================================================
app.post('/analyze', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        console.log("1. Arquivo recebido. Lendo PDF...");
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer); 
        let textoPDF = data.text;

        // --- PROTEÇÃO DE COTA (Evita erro 429) ---
        const LIMITE_CARACTERES = 1500; 
        if (textoPDF.length > LIMITE_CARACTERES) {
            console.log(`   ⚠️ Texto longo (${textoPDF.length} chars). Recortando para os primeiros ${LIMITE_CARACTERES}...`);
            textoPDF = textoPDF.substring(0, LIMITE_CARACTERES);
        }

        console.log("2. Enviando para o Gemini (Modelo 2.0 Flash)...");

        // Usamos o modelo disponível na sua conta
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });
        
        const prompt = `
            Você é um gerente de projetos especialista. Analise o texto abaixo do projeto.
            Crie 3 a 5 tarefas técnicas essenciais para o JIRA.
            
            Retorne APENAS um Array JSON válido (sem crase, sem markdown), onde cada objeto tem:
            - "summary": Título curto (max 60 chars).
            - "description": Descrição técnica detalhada.
            - "issuetype": "Task"

            Texto do documento:
            ${textoPDF}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let textResponse = response.text();
        
        // Limpeza de Markdown (remove ```json e ```)
        textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        
        // Tenta converter para JSON
        let tarefas;
        try {
            tarefas = JSON.parse(textResponse);
        } catch (e) {
            console.error("Erro ao converter resposta da IA:", textResponse);
            throw new Error("A IA não retornou um JSON válido.");
        }

        console.log(`3. IA gerou ${tarefas.length} sugestões. Retornando para o Front-end...`);

        // Apaga o arquivo temporário
        fs.unlinkSync(req.file.path);
        
        // Retorna as sugestões para o usuário editar na tela
        res.json(tarefas);

    } catch (error) {
        console.error("ERRO NA ANÁLISE:", error);
        
        // Tratamento específico para cota excedida
        if (error.message && error.message.includes("429")) {
            return res.status(429).json({ error: 'Muitas requisições. O Google bloqueou temporariamente. Tente em 1 minuto.' });
        }

        res.status(500).json({ error: 'Erro ao processar com IA', details: error.message });
    }
});

// =================================================================
// ROTA 2: CRIAÇÃO NO JIRA (Recebe lista aprovada + Credenciais do Usuário)
// =================================================================
app.post('/create-issues', async (req, res) => {
    try {
        const { tasks, config } = req.body; 
        
        if (!config || !config.domain || !config.email || !config.token) {
            return res.status(400).json({ error: 'Credenciais do Jira faltando.' });
        }

        if (!tasks || !Array.isArray(tasks)) {
            return res.status(400).send('Lista de tarefas inválida.');
        }

        console.log(`4. Conectando no Jira: ${config.domain} (Usuário: ${config.email})`);

        const createdIssues = [];
        const auth = Buffer.from(`${config.email}:${config.token}`).toString('base64');
        
        for (const tarefa of tasks) {
            const jiraPayload = {
                fields: {
                    project: { key: config.projectKey },
                    summary: tarefa.summary,
                    description: tarefa.description,
                    issuetype: { name: "Task" }
                }
            };

            try {
                // Remove barra final do domínio se houver
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