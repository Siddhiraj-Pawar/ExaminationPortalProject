package com.app.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.app.models.Category;
import com.app.models.Quiz;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCategory(Category category);
}
