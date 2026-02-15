package com.zeotap.incidenttracker.repository;

import com.zeotap.incidenttracker.entity.Incident;
import com.zeotap.incidenttracker.enums.Severity;
import com.zeotap.incidenttracker.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {

    @Query("SELECT i FROM Incident i WHERE "
            + "(:keyword IS NULL OR LOWER(i.title) LIKE LOWER(CONCAT('%', :keyword, '%')) "
            + "OR LOWER(i.description) LIKE LOWER(CONCAT('%', :keyword, '%')) "
            + "OR LOWER(i.incidentId) LIKE LOWER(CONCAT('%', :keyword, '%')) "
            + "OR LOWER(i.reportedBy) LIKE LOWER(CONCAT('%', :keyword, '%'))) "
            + "AND (:severity IS NULL OR i.severity = :severity) "
            + "AND (:status IS NULL OR i.status = :status)")
    Page<Incident> findByFilters(@Param("keyword") String keyword,
                                  @Param("severity") Severity severity,
                                  @Param("status") Status status,
                                  Pageable pageable);
}
