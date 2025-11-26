package com.codingfuture.Controllers;

import com.codingfuture.Models.Task;
import com.codingfuture.Services.RequirementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/requisitos")
@CrossOrigin(origins = "http://localhost:4200") // ⚠️ Configure o domínio do seu Front
public class RequirementController {

    private final RequirementService requirementService;

    public RequirementController(RequirementService requirementService) {
        this.requirementService = requirementService;
    }

    // Endpoint: /api/requisitos/extrair
    @PostMapping("/extrair")
    public ResponseEntity<List<Task>> extractRequirements(@RequestParam("file") MultipartFile file) {
        
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        try {
            List<Task> tasks = requirementService.analyzeAndSaveDocument(file);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}