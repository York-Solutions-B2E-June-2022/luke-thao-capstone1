package com.example.editorbackend.RequestBodyParams;

import java.util.List;

public class QuestionReq {

    public Long surveyId;
    public Long id;
    public String prompt;
    public String type;
    public Integer questionOrder;
    public List<String> answers;

}
