import { useState } from 'react';
import { createIncident, updateIncident } from '../api/incidentApi';

export default function IncidentForm({ incident, onClose, onSaved }) {
  const editing = !!incident;

  const [form, setForm] = useState({
    title: incident?.title || '',
    description: incident?.description || '',
    severity: incident?.severity || 'LOW',
    status: incident?.status || 'OPEN',
    reportedBy: incident?.reportedBy || '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // quick client-side check
    let errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.reportedBy.trim()) errs.reportedBy = 'Reporter is required';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSaving(true);
    try {
      if (editing) {
        await updateIncident(incident.id, form);
      } else {
        await createIncident(form);
      }
      onSaved();
    } catch (err) {
      // show server validation errors if any
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
    setSaving(false);
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{editing ? 'Edit Incident' : 'New Incident'}</h2>
        <form onSubmit={handleSubmit}>

          <div className="field">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} />
            {errors.title && <div className="field-error">{errors.title}</div>}
          </div>

          <div className="field">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Severity</label>
            <select name="severity" value={form.severity} onChange={handleChange}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          <div className="field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className="field">
            <label>Reported By</label>
            <input name="reportedBy" value={form.reportedBy} onChange={handleChange} />
            {errors.reportedBy && <div className="field-error">{errors.reportedBy}</div>}
          </div>

          <div className="form-buttons">
            <button type="button" className="btn btn-gray" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-blue" disabled={saving}>
              {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
