package com.example.editorbackend.Submission;

import com.example.editorbackend.Survey.SurveyEntity;
import com.example.editorbackend.User.UserEntity;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;

@Entity
public class SubmissionEntity {

    @Id
    Long id;

    @ManyToOne
    SurveyEntity survey;

    @ManyToOne
    UserEntity user;

    @ElementCollection
    List<String> answers = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public List<String> getAnswers() {
        return answers;
    }
}
