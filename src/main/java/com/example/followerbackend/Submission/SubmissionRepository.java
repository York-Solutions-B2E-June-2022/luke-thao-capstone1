package com.example.followerbackend.Submission;

import com.example.followerbackend.Survey.SurveyEntity;
import com.example.followerbackend.User.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubmissionRepository extends CrudRepository<SubmissionEntity, Long> {

    Optional<SubmissionEntity> findBySurveyAndUser(SurveyEntity surveyId, UserEntity userId);

}
