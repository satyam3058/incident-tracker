export default function IncidentTable({ incidents, sortBy, sortDir, onSort, onEdit, onDelete }) {

  function arrow(field) {
    if (sortBy !== field) return '';
    return sortDir === 'asc' ? ' ▲' : ' ▼';
  }

  function fmtDate(d) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort('incidentId')}>ID{arrow('incidentId')}</th>
          <th onClick={() => onSort('title')}>Title{arrow('title')}</th>
          <th onClick={() => onSort('severity')}>Severity{arrow('severity')}</th>
          <th onClick={() => onSort('status')}>Status{arrow('status')}</th>
          <th onClick={() => onSort('reportedBy')}>Reported By{arrow('reportedBy')}</th>
          <th onClick={() => onSort('reportedAt')}>Date{arrow('reportedAt')}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map(inc => (
          <tr key={inc.id}>
            <td>{inc.incidentId}</td>
            <td>{inc.title}</td>
            <td><span className={`pill pill-${inc.severity.toLowerCase()}`}>{inc.severity}</span></td>
            <td><span className={`pill pill-${inc.status.toLowerCase()}`}>{inc.status.replace('_', ' ')}</span></td>
            <td>{inc.reportedBy}</td>
            <td>{fmtDate(inc.reportedAt)}</td>
            <td className="actions-cell">
              <button className="btn btn-blue btn-sm" onClick={() => onEdit(inc)}>Edit</button>
              <button className="btn btn-red btn-sm" onClick={() => onDelete(inc.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
