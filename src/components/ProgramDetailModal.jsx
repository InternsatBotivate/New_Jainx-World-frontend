function ProgramDetailModal({ selectedItem, onClose }) {
    if (!selectedItem) return null;

    const formatNumber = (val) =>
        parseFloat(val || 0).toLocaleString();

    const formatUSD = (val) =>
        parseFloat(val || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const formatEUR = (val) =>
        parseFloat(val || 0).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Program Details</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">

                    {/* ---------------- Partner Info ---------------- */}
                    <h3 className="modal-section-header">Partner Information</h3>
                    <div className="modal-grid">
                        <div className="detail-item">
                            <span className="detail-label-grid">Partner Name</span>
                            <span className="detail-value-grid">{selectedItem.partnerName}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Partner Location ID</span>
                            <span className="detail-value-grid">{selectedItem.partnerLocationID}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Group Partner ID</span>
                            <span className="detail-value-grid">{selectedItem.groupPartnerID || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">ISO Country Code</span>
                            <span className="detail-value-grid">{selectedItem.isoCountryCode}</span>
                        </div>
                    </div>

                    {/* ---------------- Program Info ---------------- */}
                    <h3 className="modal-section-header">Program Details</h3>
                    <div className="modal-grid">
                        <div className="detail-item">
                            <span className="detail-label-grid">Program Quarter</span>
                            <span className="detail-value-grid">{selectedItem.programQuarter}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Scheme</span>
                            <span className="detail-value-grid">{selectedItem.scheme}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Category</span>
                            <span className="detail-value-grid">{selectedItem.category}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">BU / Sub-BU</span>
                            <span className="detail-value-grid">{selectedItem.bu} / {selectedItem.subBU}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Type</span>
                            <span className="detail-value-grid">{selectedItem.type}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Program Group</span>
                            <span className="detail-value-grid">{selectedItem.programGroup}</span>
                        </div>
                    </div>

                    {/* ---------------- Financials LC ---------------- */}
                    <h3 className="modal-section-header">Financials ({selectedItem.lcCurrency})</h3>
                    <div className="modal-grid">
                        <div className="detail-item"><span className="detail-label-grid">Target</span><span className="detail-value-grid">{formatNumber(selectedItem.targetLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Sales Adjustment</span><span className="detail-value-grid">{formatNumber(selectedItem.salesAdjustmentLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Actuals for Achievement</span><span className="detail-value-grid">{formatNumber(selectedItem.actualsForAchievementLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">M1 Actuals</span><span className="detail-value-grid">{formatNumber(selectedItem.m1ActualsLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">M1+M2 Actuals</span><span className="detail-value-grid">{formatNumber(selectedItem.m1M2ActualsLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Actuals for Pay On</span><span className="detail-value-grid">{formatNumber(selectedItem.actualsForPayOnLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Deal Exclusion</span><span className="detail-value-grid">{formatNumber(selectedItem.dealExclusionLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">STM Exclusion</span><span className="detail-value-grid">{formatNumber(selectedItem.stmExclusionLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Other Pay On Exclusion</span><span className="detail-value-grid">{formatNumber(selectedItem.otherPayOnExclusionLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Actual for Rebate</span><span className="detail-value-grid">{formatNumber(selectedItem.actualForRebateLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Bonus</span><span className="detail-value-grid">{formatNumber(selectedItem.bonusLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Linear Projection Bonus</span><span className="detail-value-grid">{formatNumber(selectedItem.linearProjectionBonusLC)}</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Exchange Rate (USD → LC)</span><span className="detail-value-grid">{selectedItem.rateUSDLC}</span></div>
                    </div>

                    {/* ---------------- Achievement ---------------- */}
                    <h3 className="modal-section-header">Achievement Metrics</h3>
                    <div className="modal-grid">
                        <div className="detail-item"><span className="detail-label-grid">Quarterly Achievement %</span><span className="detail-value-grid bold">{parseFloat(selectedItem.quarterlyAchievementPercentage || 0).toFixed(2)}%</span></div>
                        <div className="detail-item"><span className="detail-label-grid">M1 Achievement %</span><span className="detail-value-grid">{parseFloat(selectedItem.m1AchievementPercentage || 0).toFixed(2)}%</span></div>
                        <div className="detail-item"><span className="detail-label-grid">M1+M2 Achievement %</span><span className="detail-value-grid">{parseFloat(selectedItem.m1M2AchievementPercentage || 0).toFixed(2)}%</span></div>
                        <div className="detail-item"><span className="detail-label-grid">Linear Projection Achievement %</span><span className="detail-value-grid">{parseFloat(selectedItem.linearProjectionQuarterlyAchievementPercentage || 0).toFixed(2)}%</span></div>
                    </div>

                    {/* ---------------- Other ---------------- */}
                    <h3 className="modal-section-header">Other Information</h3>
                    <div className="modal-grid">
                        <div className="detail-item">
                            <span className="detail-label-grid">Status</span>
                            <span className="detail-value-grid bold">{selectedItem.status}</span>
                        </div>
                        <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                            <span className="detail-label-grid">Comments</span>
                            <span className="detail-value-grid">{selectedItem.comment || 'None'}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProgramDetailModal;