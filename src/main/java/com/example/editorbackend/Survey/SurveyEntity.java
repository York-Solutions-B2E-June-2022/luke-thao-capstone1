package com.example.editorbackend.Survey;


import com.example.editorbackend.Question.QuestionEntity;
import com.example.editorbackend.Submission.SubmissionEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class SurveyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    String title;

    @OneToMany(orphanRemoval = true)
    public
    List<QuestionEntity> questions;

    @OneToMany()
    List<SubmissionEntity> submissions;

    public SurveyEntity(String title, List<QuestionEntity> questions) {
        this.title = title;
        this.questions = questions;
    }

    public SurveyEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }


}
