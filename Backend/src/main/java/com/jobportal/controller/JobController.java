package com.jobportal.controller;

import com.jobportal.entity.Job;
import com.jobportal.repository.JobApplicationRepository;
import com.jobportal.repository.JobRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;

    public JobController(JobRepository jobRepository,
                         JobApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    // GET /api/jobs?keyword=java&location=mysuru&type=Full Time
    @GetMapping
    public List<Job> getJobs(@RequestParam(defaultValue = "") String keyword,
                             @RequestParam(defaultValue = "") String location,
                             @RequestParam(defaultValue = "") String type) {
        return jobRepository.search(keyword.trim(), location.trim(), type.trim());
    }

    // GET /api/jobs/5
    @GetMapping("/{id}")
    public Job getJob(@PathVariable Long id) {
        return jobRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Job nahi mili"));
    }

    // GET /api/jobs/employer/2  -> employer ki apni jobs
    @GetMapping("/employer/{employerId}")
    public List<Job> getEmployerJobs(@PathVariable Long employerId) {
        return jobRepository.findByPostedByOrderByIdDesc(employerId);
    }

    // POST /api/jobs
    @PostMapping
    public Job createJob(@RequestBody Job job) {
        if (job.getTitle() == null || job.getTitle().isBlank()
                || job.getCompany() == null || job.getCompany().isBlank()
                || job.getPostedBy() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Title, company aur postedBy zaroori hain");
        }
        job.setId(null);
        job.setPostedDate(LocalDate.now());
        return jobRepository.save(job);
    }

    // DELETE /api/jobs/5
    @DeleteMapping("/{id}")
    @Transactional
    public void deleteJob(@PathVariable Long id) {
        if (!jobRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Job nahi mili");
        }
        applicationRepository.deleteByJobId(id);   // pehle uski applications hatao
        jobRepository.deleteById(id);
    }
}