package com.codingfuture.Clients;

import com.codingfuture.Models.Task;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class AIClient {

    // Método que enviaria o conteúdo do arquivo para o serviço de IA
    public List<Task> extractTasksFromContent(String fileContent) throws IOException {
        System.out.println("🤖 Chamando serviço de IA para análise do documento...");
        
        // 💥 LÓGICA DE CHAMADA REAL DE IA ENTRARÁ AQUI (substituir o mock)

        // MOCK DE RESPOSTA (Simula tarefas extraídas pela IA)
        return Arrays.asList(
            new Task("Configurar ambiente Java", "Instalar SDK e IDE para desenvolvimento.", "Task", "Doc-Mock"),
            new Task("Desenvolver tela de upload", "Criar componente Angular para envio de arquivos.", "Story", "Doc-Mock"),
            new Task("Resolver falha de conexao com DB", "Investigar erro 500 ao tentar salvar dados.", "Bug", "Doc-Mock")
        );
    }
}