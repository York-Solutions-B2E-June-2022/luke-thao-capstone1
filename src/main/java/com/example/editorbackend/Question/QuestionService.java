package com.example.editorbackend.Question;

import com.example.editorbackend.RequestBodyParams.QuestionReq;
import com.example.editorbackend.RequestBodyParams.QuestionsArray;
import com.example.editorbackend.Survey.SurveyEntity;
import com.example.editorbackend.Survey.SurveyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    QuestionRepository questionRepository;
    SurveyRepository surveyRepository;

    public QuestionService(QuestionRepository questionRepository, SurveyRepository surveyRepository) {
        this.questionRepository = questionRepository;
        this.surveyRepository = surveyRepository;
    }

    public void edit(List<QuestionReq> questions) {

        questions.forEach(question -> {
            Optional<QuestionEntity> questionExist = questionRepository.findById(question.id);

            if (questionExist.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            QuestionEntity questionGet = questionExist.get();

            if (question.prompt != null) {
                questionGet.prompt = question.prompt;
            }

            if (question.questionOrder != null) {
                questionGet.questionOrder = question.questionOrder;
            }

            if (question.type != null) {
                questionGet.type = question.type;
            }

            if (question.answers != null) {
                questionGet.answers = question.answers;
            }

            questionRepository.save(questionGet);
        });

    }

    public void create(List<QuestionReq> questions, Long surveyId) {

        questions.forEach(question -> {
            Optional<SurveyEntity> existingSurvey = surveyRepository.findById(surveyId);

            if (existingSurvey.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            QuestionEntity newQuestion = new QuestionEntity(question.prompt, question.type, question.questionOrder, question.answers);

            questionRepository.save(newQuestion);

            SurveyEntity survey = existingSurvey.get();

            survey.questions.add(newQuestion);

            surveyRepository.save(survey);
        });


    }

    public void delete(List<Long> questionIds, Long surveyId) {

        questionIds.forEach(id -> {
            Optional<QuestionEntity> existingQuestion = questionRepository.findById(id);

            Optional<SurveyEntity> existingSurvey = surveyRepository.findById(surveyId);

            if (existingQuestion.isEmpty() || existingSurvey.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            QuestionEntity questionGet = existingQuestion.get();

            SurveyEntity survey = existingSurvey.get();

            if (survey.questions.contains(questionGet)) {
                survey.questions.remove(questionGet);
                surveyRepository.save(survey);
                questionRepository.delete(questionGet);
            }
        });

    }




}
