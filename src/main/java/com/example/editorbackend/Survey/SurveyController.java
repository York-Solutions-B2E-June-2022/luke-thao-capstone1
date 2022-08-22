package com.example.editorbackend.Survey;

import com.example.editorbackend.Question.QuestionEntity;
import com.example.editorbackend.RequestBodyParams.SurveyReq;
import com.example.editorbackend.Submission.SubmissionEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/survey")
@CrossOrigin
public class SurveyController {

    SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping("/all")
    public Iterable<SurveyEntity> list() {
        return surveyService.list();
    }

    @GetMapping()
    public List<QuestionEntity> getAnswers(@RequestParam Long id) {
        return surveyService.getAnswers(id);
    }

    @PostMapping()
    public void create(@RequestBody SurveyReq requestBody) {

        surveyService.create(requestBody.title, requestBody.questions);
    }

    @DeleteMapping()
    public void delete(@RequestParam Long id) {

        surveyService.delete(id);
    }

    @PatchMapping()
    public void edit(@RequestBody SurveyReq requestBody) {

        surveyService.edit(requestBody.id, requestBody.title);
    }

    @GetMapping("/submissions")
    public List<SubmissionEntity> getSubmissions(@RequestParam Long id) {
        return surveyService.getSubmissions(id);
    }

}


