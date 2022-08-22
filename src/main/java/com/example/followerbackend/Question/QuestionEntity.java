package com.example.followerbackend.Question;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
public class QuestionEntity {

    @Id
    Long id;

    String prompt;

    String type;

    Integer questionOrder;

    @ElementCollection
    List<String> answers = new ArrayList<String>();


    public Long getId() {
        return id;
    }

    public String getPrompt() {
        return prompt;
    }

    public String getType() {
        return type;
    }

    public Integer getQuestionOrder() {
        return questionOrder;
    }

    public List<String> getAnswers() {
        return answers;
    }
}
