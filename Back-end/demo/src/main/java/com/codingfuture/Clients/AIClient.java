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
        
        // 💥 LÓGICA DE CHAMADA REAL DE IA ENTRARÁ AQUI (usando WebClient ou RestTemplate)

        // MOCK DE RESPOSTA (Substitua esta parte!)
        return Arrays.asList(
            // Certifique-se de que os tipos correspondem ao modelo!
            new Task("Implementar Login", "Desenvolver a funcionalidade...", "Story", "Doc-Mock"), 
            new Task("Corrigir CSS", "Ajustar layout da página de requisitos.", "Bug", "Doc-Mock")
        );
    }
}