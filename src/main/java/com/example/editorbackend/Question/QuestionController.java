package com.example.editorbackend.Question;
import com.example.editorbackend.RequestBodyParams.QuestionsArray;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
@CrossOrigin
public class QuestionController {

    QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PatchMapping()
    public void edit(@RequestBody QuestionsArray requestBody) {

        questionService.edit(requestBody.questions);
    }

    @PostMapping()
    public void create(@RequestBody QuestionsArray requestBody) {

        questionService.create(requestBody.questions, requestBody.id);
    }

    @PatchMapping("/delete")
    public void delete (@RequestBody QuestionsArray requestBody) {

        questionService.delete(requestBody.questionIds, requestBody.id);
    }

}




