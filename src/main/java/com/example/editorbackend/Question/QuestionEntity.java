package com.example.editorbackend.Question;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    @Column(columnDefinition = "text")
    String prompt;

    String type;

    Integer questionOrder;

    @ElementCollection
    List<String> answers;

    public QuestionEntity() {
    }

    public QuestionEntity(String prompt, String type, Integer questionOrder, List<String> answers) {
        this.prompt = prompt;
        this.type = type;
        this.questionOrder = questionOrder;
        this.answers = answers;
    }

    public Long getId() {
        return id;
    }

    public String getPrompt() {
        return prompt;
    }

    public String getType() {
        return type;
    }

    public Integer getQuestionOrder() {
        return questionOrder;
    }

    public List<String> getAnswers() {
        return answers;
    }
}
