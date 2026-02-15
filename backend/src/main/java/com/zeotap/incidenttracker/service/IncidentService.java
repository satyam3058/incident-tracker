package com.zeotap.incidenttracker.service;

import com.zeotap.incidenttracker.dto.IncidentRequest;
import com.zeotap.incidenttracker.dto.IncidentResponse;
import com.zeotap.incidenttracker.entity.Incident;
import com.zeotap.incidenttracker.enums.Severity;
import com.zeotap.incidenttracker.enums.Status;
import com.zeotap.incidenttracker.repository.IncidentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class IncidentService {

    private final IncidentRepository repo;

    public IncidentService(IncidentRepository repo) {
        this.repo = repo;
    }

    public Page<IncidentResponse> findAll(String search, Severity severity,
                                           Status status, Pageable pageable) {

        String keyword = (search != null && !search.isBlank()) ? search.trim() : null;
        Page<Incident> results = repo.findByFilters(keyword, severity, status, pageable);
        return results.map(this::toResponse);
    }

    public IncidentResponse findById(Long id) {
        Incident inc = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Incident not found: " + id));
        return toResponse(inc);
    }

    @Transactional
    public IncidentResponse create(IncidentRequest req) {
        Incident inc = new Incident();
        inc.setIncidentId(nextIncidentId());
        copyFields(req, inc);
        return toResponse(repo.save(inc));
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public IncidentResponse update(Long id, IncidentRequest req) {
        Incident inc = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Incident not found: " + id));
        copyFields(req, inc);
        return toResponse(repo.save(inc));
    }

    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Incident not found: " + id);
        }
        repo.deleteById(id);
    }

    // --- helpers ---

    private String nextIncidentId() {
        long count = repo.count();
        return String.format("INC-%05d", count + 1);
    }

    private void copyFields(IncidentRequest req, Incident inc) {
        inc.setTitle(req.getTitle());
        inc.setDescription(req.getDescription());
        inc.setSeverity(req.getSeverity());
        inc.setStatus(req.getStatus());
        inc.setReportedBy(req.getReportedBy());
    }

    private IncidentResponse toResponse(Incident inc) {
        IncidentResponse dto = new IncidentResponse();
        dto.setId(inc.getId());
        dto.setIncidentId(inc.getIncidentId());
        dto.setTitle(inc.getTitle());
        dto.setDescription(inc.getDescription());
        dto.setSeverity(inc.getSeverity());
        dto.setStatus(inc.getStatus());
        dto.setReportedBy(inc.getReportedBy());
        dto.setReportedAt(inc.getReportedAt());
        dto.setUpdatedAt(inc.getUpdatedAt());
        return dto;
    }
}
