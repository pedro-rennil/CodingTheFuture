package com.codingfuture.Services;

import com.codingfuture.Clients.AIClient;
import com.codingfuture.Models.Task;
import com.codingfuture.Repositories.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class RequirementService {

    private final AIClient aiClient;
    private final TaskRepository taskRepository;

    public RequirementService(AIClient aiClient, TaskRepository taskRepository) {
        this.aiClient = aiClient;
        this.taskRepository = taskRepository;
    }

    public List<Task> analyzeAndSaveDocument(MultipartFile file) throws IOException {
        
        // 1. Extrair o conteúdo do arquivo
        String fileContent = new String(file.getBytes(), StandardCharsets.UTF_8);

        // 2. Chamar o serviço de IA
        List<Task> extractedTasks = aiClient.extractTasksFromContent(fileContent);

        // 3. Opcional: Atribuir o nome do documento à Task antes de salvar
        String fileName = file.getOriginalFilename();
        extractedTasks.forEach(task -> task.setSourceDocument(fileName));
        
        // 4. Salvar as tarefas no banco de dados
        return taskRepository.saveAll(extractedTasks);
    }
}