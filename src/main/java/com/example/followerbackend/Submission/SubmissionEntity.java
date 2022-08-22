package com.example.followerbackend.Submission;

import com.example.followerbackend.Survey.SurveyEntity;
import com.example.followerbackend.User.UserEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class SubmissionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    @ManyToOne
    SurveyEntity survey;

    @ManyToOne
    UserEntity user;

    @ElementCollection
    List<String> answers = new ArrayList<>();

    public SubmissionEntity() {

    }

    public SubmissionEntity(SurveyEntity survey, UserEntity user, ArrayList<String> answers) {

        this.survey = survey;
        this.user = user;
        this.answers = answers;
    }
}
