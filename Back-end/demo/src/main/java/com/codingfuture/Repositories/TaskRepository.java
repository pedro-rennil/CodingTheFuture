package com.codingfuture.Repositories;

import com.codingfuture.Models.Task;
import org.springframework.data.jpa.repository.JpaRepository; // 👈 Nova interface
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
// O primeiro tipo é a Entidade (Task), o segundo é o tipo do ID (Long)
public interface TaskRepository extends JpaRepository<Task, Long> { 
    
    // O método de busca personalizado permanece o mesmo!
    List<Task> findBySourceDocument(String sourceDocument);
}