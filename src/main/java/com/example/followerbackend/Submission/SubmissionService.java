package com.example.followerbackend.Submission;

import com.example.followerbackend.RequestBodyParams.SubmissionReqs;
import com.example.followerbackend.Survey.SurveyEntity;
import com.example.followerbackend.Survey.SurveyRepository;
import com.example.followerbackend.User.UserEntity;
import com.example.followerbackend.User.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class SubmissionService {

    SubmissionRepository submissionRepository;
    SurveyRepository surveyRepository;
    UserRepository userRepository;


    public SubmissionService(SubmissionRepository submissionRepository, SurveyRepository surveyRepository, UserRepository userRepository) {
        this.submissionRepository = submissionRepository;
        this.surveyRepository = surveyRepository;
        this.userRepository = userRepository;
    }

    public void create(SubmissionReqs requestBody) {

        Optional<SurveyEntity> existingSurvey = surveyRepository.findById(requestBody.surveyId);
        Optional<UserEntity> existingUser = userRepository.findById(requestBody.userId);

        if (existingUser.isEmpty() | existingSurvey.isEmpty()) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        SurveyEntity survey = existingSurvey.get();
        UserEntity user = existingUser.get();

        Optional<SubmissionEntity> existingSubmission = submissionRepository.findBySurveyAndUser(survey, user);

        if (existingSubmission.isPresent()) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        SubmissionEntity submission = new SubmissionEntity(survey, user, requestBody.answers);

        submissionRepository.save(submission);

        survey.addToSubmission(submission);

        surveyRepository.save(survey);

    }

}
