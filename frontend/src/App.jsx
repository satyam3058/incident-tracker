import { useState, useEffect } from 'react';
import { fetchIncidents, deleteIncident } from './api/incidentApi';
import IncidentTable from './components/IncidentTable';
import IncidentForm from './components/IncidentForm';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

function App() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('reportedAt');
  const [sortDir, setSortDir] = useState('desc');
  const [loading, setLoading] = useState(false);

  // form state
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function loadIncidents() {
    setLoading(true);
    try {
      const params = { page, size: 10, sortBy, sortDir };
      if (search) params.search = search;
      if (severity) params.severity = severity;
      if (status) params.status = status;

      const { data } = await fetchIncidents(params);
      setIncidents(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error('Failed to load incidents', err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, [page, search, severity, status, sortBy, sortDir]);

  // go back to page 0 when filters change
  useEffect(() => { setPage(0); }, [search, severity, status]);

  function handleSort(field) {
    if (sortBy === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir('asc');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this incident?')) return;
    await deleteIncident(id);
    loadIncidents();
  }

  function openEdit(incident) {
    setEditing(incident);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  function onSaved() {
    closeForm();
    loadIncidents();
  }

  return (
    <div className="container">
      <header>
        <h1>Incident Tracker</h1>
        <button className="btn btn-blue" onClick={() => setFormOpen(true)}>
          + New Incident
        </button>
      </header>

      <SearchBar
        search={search} onSearch={setSearch}
        severity={severity} onSeverity={setSeverity}
        status={status} onStatus={setStatus}
      />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : incidents.length === 0 ? (
        <div className="empty">No incidents found.</div>
      ) : (
        <>
          <IncidentTable
            incidents={incidents}
            sortBy={sortBy} sortDir={sortDir}
            onSort={handleSort}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
          <Pagination
            page={page} totalPages={totalPages}
            total={totalElements} onChange={setPage}
          />
        </>
      )}

      {formOpen && (
        <IncidentForm
          incident={editing}
          onClose={closeForm}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}

export default App;
