function FilterBar({
  partnerId,
  setPartnerId,
  quarter,
  setQuarter,
  page,
  setPage,
  pageSize,
  setPageSize,
  handleSearchClick,
}) {
  return (
    <div className="filter-bar">
      <div className="form-group">
        <label>Partner ID</label>
        <input
          type="text"
          className="form-control"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Quarter</label>
        <input
          type="text"
          className="form-control"
          value={quarter}
          onChange={(e) => setQuarter(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Page</label>
        <input
          type="number"
          className="form-control"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          style={{ width: "80px" }}
        />
      </div>
      <div className="form-group">
        <label>Page Size</label>
        <input
          type="number"
          className="form-control"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          style={{ width: "80px" }}
        />
      </div>
      <div className="form-group" style={{ marginLeft: "auto" }}>
        <button className="btn-fetch" onClick={handleSearchClick}>
          Search Data
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
