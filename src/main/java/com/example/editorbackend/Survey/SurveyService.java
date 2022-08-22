package com.example.editorbackend.Survey;

import com.example.editorbackend.Question.QuestionEntity;
import com.example.editorbackend.Question.QuestionRepository;
import com.example.editorbackend.RequestBodyParams.QuestionReq;
import com.example.editorbackend.Submission.SubmissionEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    SurveyRepository surveyRepository;
    QuestionRepository questionRepository;

    public SurveyService(SurveyRepository surveyRepository, QuestionRepository questionRepository) {
        this.surveyRepository = surveyRepository;
        this.questionRepository = questionRepository;
    }

    public Iterable<SurveyEntity> list() {
        return surveyRepository.findAll();
    }

    public List<QuestionEntity> getAnswers(Long id) {
        Optional<SurveyEntity> existingSurvey = surveyRepository.findById(id);

        if (existingSurvey.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return existingSurvey.get().questions;
    }

    public void create(String title, List<QuestionReq> questions) {



        List<QuestionEntity> listOfQuestions = new ArrayList<>();

        questions.forEach(question -> {
            QuestionEntity newQuestion = new QuestionEntity(question.prompt, question.type, question.questionOrder, question.answers);

            questionRepository.save(newQuestion);

            listOfQuestions.add(newQuestion);
        });

        SurveyEntity survey = new SurveyEntity(title, listOfQuestions);

        surveyRepository.save(survey);
    }

    public void delete(Long id) {
        Optional<SurveyEntity> existingSurvey = surveyRepository.findById(id);

        if (existingSurvey.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        surveyRepository.delete(existingSurvey.get());
    }

    public void edit(Long id, String title) {
        Optional<SurveyEntity> existingSurvey = surveyRepository.findById(id);

        if (existingSurvey.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        SurveyEntity survey = existingSurvey.get();

        survey.title = title;

        surveyRepository.save(survey);
    }

    public List<SubmissionEntity> getSubmissions(Long id) {
        Optional<SurveyEntity> existingSurvey = surveyRepository.findById(id);

        if (existingSurvey.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return existingSurvey.get().submissions;
    }


}
