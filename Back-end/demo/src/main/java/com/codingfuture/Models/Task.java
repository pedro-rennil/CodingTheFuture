package com.codingfuture.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Getter                 // Gera todos os métodos getXxx()
@Setter                 // Gera todos os métodos setXxx()
@NoArgsConstructor      // Gera o construtor padrão (Task())
@AllArgsConstructor     // Gera o construtor com todos os campos
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String type; // "Story", "Task", "Bug"
    private String sourceDocument; // Nome do arquivo de onde foi extraído
    
    // Construtor manual mantido para a inicialização no AIClient (Embora @AllArgsConstructor já faça isso)
    public Task(String title, String description, String type, String sourceDocument) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.sourceDocument = sourceDocument;
    }
}