import { useState, useEffect } from 'react';

export default function SearchBar({ search, onSearch, severity, onSeverity, status, onStatus }) {
  const [text, setText] = useState(search);

  // debounce the search input
  useEffect(() => {
    const t = setTimeout(() => onSearch(text), 400);
    return () => clearTimeout(t);
  }, [text]);

  return (
    <div className="filters">
      <input
        placeholder="Search incidents..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <select value={severity} onChange={e => onSeverity(e.target.value)}>
        <option value="">All Severities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="CRITICAL">Critical</option>
      </select>
      <select value={status} onChange={e => onStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
        <option value="CLOSED">Closed</option>
      </select>
    </div>
  );
}
