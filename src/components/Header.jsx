import React, { useEffect, useMemo } from "react";

function Header({
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

    // 🔥 Generate quarters dynamically from Q1-26 to current quarter
    const generateQuarters = () => {
        const quarters = [];
        const startYear = 2026; // Q1-26 starting label year
        const now = new Date();

        const getCurrentQuarter = () => {
            const month = now.getMonth(); // 0-based
            const year = now.getFullYear();

            // Financial year mapping:
            // Q1: Nov-Jan
            // Q2: Feb-Apr
            // Q3: May-Jul
            // Q4: Aug-Oct

            if (month === 10 || month === 11 || month === 0) {
                // Nov, Dec, Jan
                return {
                    q: 1,
                    labelYear: month === 0 ? year : year + 1,
                };
            } else if (month >= 1 && month <= 3) {
                return { q: 2, labelYear: year };
            } else if (month >= 4 && month <= 6) {
                return { q: 3, labelYear: year };
            } else {
                return { q: 4, labelYear: year };
            }
        };

        const current = getCurrentQuarter();

        for (let year = startYear; year <= current.labelYear; year++) {
            for (let q = 1; q <= 4; q++) {
                if (year === current.labelYear && q > current.q) break;

                const label = `Q${q}-${String(year).slice(-2)}`;
                quarters.push(label);
            }
        }

        return quarters;
    };

    const quarterOptions = useMemo(() => generateQuarters(), []);

    // 🔥 Default select current quarter or load from localStorage
    useEffect(() => {
        const savedQuarter = localStorage.getItem("selectedQuarter");

        if (savedQuarter && quarterOptions.includes(savedQuarter)) {
            setQuarter(savedQuarter);
        } else {
            const currentQuarter = quarterOptions[quarterOptions.length - 1];
            setQuarter(currentQuarter);
            localStorage.setItem("selectedQuarter", currentQuarter);
        }
    }, [quarterOptions, setQuarter]);

    // 🔥 Handle quarter change
    const handleQuarterChange = (e) => {
        const value = e.target.value;
        setQuarter(value);
        localStorage.setItem("selectedQuarter", value);
    };

    return (
        <div className="header">
            <div className="header-top">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
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
                    <select
                        className="header-filter-input"
                        value={quarter}
                        onChange={handleQuarterChange}
                        style={{
                            backgroundColor: "#2a5298",
                            color: "#ffffff",
                            border: "1px solid #1e3c72"
                        }}
                    >
                        {quarterOptions.map((q) => (
                            <option key={q} value={q}>
                                {q}
                            </option>
                        ))}
                    </select>
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
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