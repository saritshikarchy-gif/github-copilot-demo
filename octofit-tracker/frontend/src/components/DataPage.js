import React, { useState } from 'react';

function DataPage({ title, columns, rows, loading, error, getKey, matches, detailsTitle, renderDetails }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const inputId = `filter-${title.toLowerCase()}`;

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2" role="status">
        <div className="spinner-border text-primary" aria-hidden="true"></div>
        <span>Loading {title.toLowerCase()}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Could not load {title.toLowerCase()}: {error}
      </div>
    );
  }

  const needle = query.trim().toLowerCase();
  const visibleRows = needle ? rows.filter(row => matches(row, needle)) : rows;

  return (
    <div>
      <h1 className="h2 octofit-heading mb-3">{title}</h1>
      <div className="card octofit-card shadow-sm">
        <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span className="text-secondary">
            Showing {visibleRows.length} of {rows.length}
          </span>
          <form className="d-flex" role="search" onSubmit={event => event.preventDefault()}>
            <label htmlFor={inputId} className="visually-hidden">Filter {title}</label>
            <input
              id={inputId}
              className="form-control"
              type="search"
              placeholder={`Filter ${title.toLowerCase()}`}
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </form>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0 octofit-table">
            <thead>
              <tr>
                {columns.map(column => (
                  <th scope="col" key={column.header}>{column.header}</th>
                ))}
                {renderDetails && <th scope="col" className="text-end">Details</th>}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map(row => (
                <tr key={getKey(row)}>
                  {columns.map(column => (
                    <td key={column.header}>{column.render(row)}</td>
                  ))}
                  {renderDetails && (
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#detailsModal"
                        onClick={() => setSelected(row)}
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {visibleRows.length === 0 && (
                <tr>
                  <td colSpan={columns.length + (renderDetails ? 1 : 0)} className="text-center text-secondary py-4">
                    No {title.toLowerCase()} found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {renderDetails && (
        <div className="modal fade" id="detailsModal" tabIndex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title h5" id="detailsModalLabel">
                  {selected ? detailsTitle(selected) : ''}
                </h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">{selected && renderDetails(selected)}</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataPage;
