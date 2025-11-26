package com.codingfuture.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // 👈 Nova anotação: marca como entidade JPA (tabela no DB)
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 👈 Geração automática do ID pelo DB
    private Long id; // Usamos Long para IDs auto-incrementáveis em SQL

    private String title;
    private String description;
    private String type;
    private String sourceDocument;

    // Construtores, Getters e Setters (se estiver usando Lombok, anote com @Data)
    // ...
}