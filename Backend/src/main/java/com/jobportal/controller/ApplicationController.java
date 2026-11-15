package com.jobportal.controller;

import com.jobportal.entity.Job;
import com.jobportal.entity.JobApplication;
import com.jobportal.entity.User;
import com.jobportal.repository.JobApplicationRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private static final Set<String> STATUSES =
            Set.of("APPLIED", "SHORTLISTED", "ACCEPTED", "REJECTED");

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationController(JobApplicationRepository applicationRepository,
                                 JobRepository jobRepository,
                                 UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    // POST /api/applications   body: { jobId, userId, resumeLink, coverLetter }
    @PostMapping
    public JobApplication apply(@RequestBody JobApplication req) {
        if (req.getJobId() == null || req.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "jobId aur userId zaroori hain");
        }
        Job job = jobRepository.findById(req.getJobId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Job nahi mili"));
        User user = userRepository.findById(req.getUserId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User nahi mila"));

        if (!"JOB_SEEKER".equals(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Sirf job seeker apply kar sakta hai");
        }
        if (applicationRepository.existsByJobIdAndUserId(job.getId(), user.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Aap is job me pehle hi apply kar chuke hain");
        }

        JobApplication app = new JobApplication();
        app.setJobId(job.getId());
        app.setUserId(user.getId());
        app.setJobTitle(job.getTitle());
        app.setCompany(job.getCompany());
        app.setApplicantName(user.getName());
        app.setApplicantEmail(user.getEmail());
        app.setResumeLink(req.getResumeLink());
        app.setCoverLetter(req.getCoverLetter());
        app.setStatus("APPLIED");
        app.setAppliedDate(LocalDate.now());
        return applicationRepository.save(app);
    }

    // GET /api/applications/user/3  -> job seeker ki applications
    @GetMapping("/user/{userId}")
    public List<JobApplication> byUser(@PathVariable Long userId) {
        return applicationRepository.findByUserIdOrderByIdDesc(userId);
    }

    // GET /api/applications/job/5  -> kisi job ke saare applicants
    @GetMapping("/job/{jobId}")
    public List<JobApplication> byJob(@PathVariable Long jobId) {
        return applicationRepository.findByJobIdOrderByIdDesc(jobId);
    }

    // PUT /api/applications/7/status?status=SHORTLISTED
    @PutMapping("/{id}/status")
    public JobApplication updateStatus(@PathVariable Long id,
                                       @RequestParam String status) {
        if (!STATUSES.contains(status)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid status");
        }
        JobApplication app = applicationRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Application nahi mili"));
        app.setStatus(status);
        return applicationRepository.save(app);
    }
}
