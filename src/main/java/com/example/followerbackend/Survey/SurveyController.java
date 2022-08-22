package com.example.followerbackend.Survey;

import com.example.followerbackend.Question.QuestionEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
    public List<QuestionEntity> getQuestions(@RequestParam Long id) {
        return surveyService.getQuestions(id);
    }

}
