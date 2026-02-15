export default function Pagination({ page, totalPages, total, onChange }) {
  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => onChange(0)}>« First</button>
      <button disabled={page === 0} onClick={() => onChange(page - 1)}>‹ Prev</button>
      <span>Page {page + 1} of {totalPages} ({total} total)</span>
      <button disabled={page >= totalPages - 1} onClick={() => onChange(page + 1)}>Next ›</button>
      <button disabled={page >= totalPages - 1} onClick={() => onChange(totalPages - 1)}>Last »</button>
    </div>
  );
}
