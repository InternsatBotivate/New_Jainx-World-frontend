function Header({ partnerId, setPartnerId, quarter, setQuarter, page, setPage, pageSize, setPageSize,handleSearchClick }) {
    return (
        <div className="header">
            <div className="header-top">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <h1>HP Partner Compensation Programs</h1>
            </div>
            <div className="header-filters">
                <div className="header-filter-group">
                    <label className="header-filter-label">Partner ID</label>
                    <input
                        type="text"
                        className="header-filter-input"
                        value={partnerId}
                        onChange={(e) => setPartnerId(e.target.value)}
                        readOnly
                    />
                </div>
                <div className="header-filter-group">
                    <label className="header-filter-label">Quarter</label>
                    <input
                        type="text"
                        className="header-filter-input"
                        value={quarter}
                        onChange={(e) => setQuarter(e.target.value)}
                    />
                </div>
                <div className="header-filter-group">
                    <label className="header-filter-label">Page</label>
                    <input
                        type="number"
                        className="header-filter-input header-filter-input--small"
                        value={page}
                        onChange={(e) => setPage(e.target.value)}
                    />
                </div>
                <div className="header-filter-group">
                    <label className="header-filter-label">Page Size</label>
                    <input
                        type="number"
                        className="header-filter-input header-filter-input--small"
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value)}
                    />
                </div>
                <button className="header-search-btn" onClick={handleSearchClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    Search Data
                </button>
            </div>
        </div>
    );
}

export default Header;

