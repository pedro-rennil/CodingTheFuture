require('dotenv').config();
const axios = require('axios');

async function listarModelos() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("ERRO: Chave API não encontrada no arquivo .env");
        return;
    }

    console.log("Consultando API do Google para ver modelos disponíveis...");
    
    try {
        // Vamos bater direto na API REST do Google para listar os modelos
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        
        console.log("\n✅ SUCESSO! Aqui estão os modelos disponíveis para você:\n");
        
        const models = response.data.models;
        models.forEach(model => {
            // Filtramos apenas os modelos que geram conteúdo (chat)
            if (model.supportedGenerationMethods.includes("generateContent")) {
                console.log(`Nome: ${model.name.replace('models/', '')}`); // Exibe o nome limpo
                console.log(`Versão: ${model.version}`);
                console.log("------------------------------------------------");
            }
        });

    } catch (error) {
        console.error("❌ ERRO AO LISTAR MODELOS:", error.response ? error.response.data : error.message);
    }
}

listarModelos();