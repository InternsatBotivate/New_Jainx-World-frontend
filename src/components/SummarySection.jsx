import { useState, useEffect, useMemo } from 'react';

function SummarySection({ summary, page, data, filterCategory, setFilterCategory, filterBU, setFilterBU, filterStatus, setFilterStatus, searchQuery, setSearchQuery }) {
    // Default to open, but we'll check screen size in useEffect
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        // If mobile, start collapsed
        if (window.innerWidth <= 768) {
            setIsExpanded(false);
        }
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };    

    // Extract unique values for dropdowns
    const categories = useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map(d => d.category).filter(Boolean))];
    }, [data]);

    const businessUnits = useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map(d => d.bu).filter(Boolean))];
    }, [data]);

    const statuses = useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map(d => d.status).filter(Boolean))];
    }, [data]);

    if (!summary) return null;

    return (
        <div className="summary-section">
            {/* Header is always visible and clickable to toggle */}
            <div className="summary-header" onClick={toggleExpand} style={{ cursor: 'pointer', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>Program Information</h3>
                </div>

                {/* Chevron Icon that rotates */}
                <div className={`summary-toggle-icon ${isExpanded ? 'expanded' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>

            {/* Collapsible Content */}
            {isExpanded && (
                <div className="summary-content-wrapper">
                    <div className="summary-grid">
                        <div className="summary-item">
                            <label>Program Quarter</label>
                            <span>{summary.programQuarter}</span>
                        </div>
                        <div className="summary-item">
                            <label>Partner Name</label>
                            <span>{summary.partnerName}</span>
                        </div>
                        <div className="summary-item">
                            <label>Partner Location ID</label>
                            <span>{summary.partnerLocationID}</span>
                        </div>
                        <div className="summary-item">
                            <label>Total Records</label>
                            <span>{summary.totalRecords}</span>
                        </div>
                        <div className="summary-item">
                            <label>Current Page</label>
                            <span>{page} / {summary.totalPages || 1}</span>
                        </div>

                        <div className="summary-item">
                            <label>Total Target</label>
                            <span className="bold">{summary.totalTarget}</span>
                        </div>
                        <div className="summary-item">
                            <label>Total Achievement</label>
                            <span className="bold">{summary.totalAchievement}</span>
                        </div>
                        <div className="summary-item">
                            <label>Achievement %</label>
                            <span className="bold">{summary.achievementPct}</span>
                        </div>
                        <div className="summary-item">
                            <label>Total Bonus</label>
                            <span className="bold text-success">{summary.totalBonus}</span>
                        </div>
                    </div>

                    {/* Filter Row: Dropdowns + Search Input */}
                    <div className="summary-filter-row">
                        <div className="summary-filter-group">
                            <label className="summary-filter-label">Category</label>
                            <select
                                className="summary-filter-select"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="summary-filter-group">
                            <label className="summary-filter-label">Business Unit</label>
                            <select
                                className="summary-filter-select"
                                value={filterBU}
                                onChange={(e) => setFilterBU(e.target.value)}
                            >
                                <option value="">All BUs</option>
                                {businessUnits.map(bu => (
                                    <option key={bu} value={bu}>{bu}</option>
                                ))}
                            </select>
                        </div>
                        <div className="summary-filter-group">
                            <label className="summary-filter-label">Status</label>
                            <select
                                className="summary-filter-select"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">All Statuses</option>
                                {statuses.map(st => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                        </div>
                        <div className="summary-filter-group summary-filter-group--search">
                            <label className="summary-filter-label">Search Programs</label>
                            <div className="summary-search-wrapper">
                                <svg className="summary-search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    className="summary-filter-search"
                                    placeholder="Search by scheme, type..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="summary-filter-group" style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
                            <button className="btn-refresh">
                                Refresh Summary
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SummarySection;
