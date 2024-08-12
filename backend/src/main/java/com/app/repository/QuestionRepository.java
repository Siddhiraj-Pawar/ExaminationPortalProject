package com.app.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.app.models.Question;
import com.app.models.Quiz;

import java.util.List;


public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuiz(Quiz quiz);
}
