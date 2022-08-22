package com.example.followerbackend.Survey;

import com.example.followerbackend.Question.QuestionEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    SurveyRepository surveyRepository;

    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    public Iterable<SurveyEntity> list() {

        return surveyRepository.findAll();

    }

    public List<QuestionEntity> getQuestions(Long id) {

        Optional<SurveyEntity> existingProcess = surveyRepository.findById(id);

        if (existingProcess.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return existingProcess.get().questions;
    }
}
