package com.jobportal.repository;

import com.jobportal.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByPostedByOrderByIdDesc(Long postedBy);

    // keyword / location / type khali ("") ho to us filter se sab match hote hain
    @Query("SELECT j FROM Job j WHERE "
         + "(LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) "
         + " OR LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%'))) "
         + "AND LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')) "
         + "AND (:type = '' OR j.jobType = :type) "
         + "ORDER BY j.id DESC")
    List<Job> search(@Param("keyword") String keyword,
                     @Param("location") String location,
                     @Param("type") String type);
}
