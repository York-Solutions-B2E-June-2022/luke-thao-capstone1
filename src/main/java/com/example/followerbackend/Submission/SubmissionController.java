package com.example.followerbackend.Submission;

import com.example.followerbackend.RequestBodyParams.SubmissionReqs;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/submitSurvey")
@CrossOrigin
public class SubmissionController {

    SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping()
    public void create(@RequestBody SubmissionReqs requestBody) {
        submissionService.create(requestBody);
    }


}
