package com.example.followerbackend.Survey;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.followerbackend.Submission.SubmissionEntity;
import com.example.followerbackend.Question.QuestionEntity;


@Entity
public class SurveyEntity {

    @Id
    Long id;

    String title;

    @OneToMany()
    List<QuestionEntity> questions;

    @OneToMany()
    List<SubmissionEntity> submissions;

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void addToSubmission(SubmissionEntity submission) {
        submissions.add(submission);
    }
}
