function ProgramDetailModal({ selectedItem, onClose }) {
    if (!selectedItem) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Program Details</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
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
                            <span className="detail-label-grid">ISO Country Code</span>
                            <span className="detail-value-grid">{selectedItem.isoCountryCode}</span>
                        </div>
                    </div>

                    <h3 className="modal-section-header">Program Details</h3>
                    <div className="modal-grid">
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

                    <h3 className="modal-section-header">Financials (USD)</h3>
                    <div className="modal-grid">
                        <div className="detail-item">
                            <span className="detail-label-grid">Target</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.targetUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Sales Adjustment</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.salesAdjustmentUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Actuals for Achievement</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.actualsForAchievementUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">M1 Actuals</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.m1ActualsUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">M1+M2 Actuals</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.m1M2ActualsUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Actuals for Pay On</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.actualsForPayOnUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Actual for Rebate</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.actualForRebateUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Bonus</span>
                            <span className="detail-value-grid text-success bold">{parseFloat(selectedItem.bonusUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </div>
                    </div>

                    <h3 className="modal-section-header">Financials ({selectedItem.lcCurrency})</h3>
                    <div className="modal-grid">
                        <div className="detail-item">
                            <span className="detail-label-grid">Target</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.targetLC).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Sales Adjustment</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.salesAdjustmentLC).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Actuals for Achievement</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.actualsForAchievementLC).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">M1 Actuals</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.m1ActualsLC).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">M1+M2 Actuals</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.m1M2ActualsLC).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Actuals for Pay On</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.actualsForPayOnLC).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Actual for Rebate</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.actualForRebateLC).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Bonus</span>
                            <span className="detail-value-grid">{parseFloat(selectedItem.bonusLC).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Exchange Rate (USD to LC)</span>
                            <span className="detail-value-grid">{selectedItem.rateUSDLC}</span>
                        </div>
                    </div>

                    <h3 className="modal-section-header">Achievement Metrics</h3>
                    <div className="modal-grid">
                        <div className="detail-item">
                            <span className="detail-label-grid">Quarterly Achievement %</span>
                            <span className="detail-value-grid bold">{selectedItem.quarterlyAchievementPercentage}%</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">M1 Achievement %</span>
                            <span className="detail-value-grid">{selectedItem.m1AchievementPercentage}%</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">M1+M2 Achievement %</span>
                            <span className="detail-value-grid">{selectedItem.m1M2AchievementPercentage}%</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label-grid">Linear Projection Achievement %</span>
                            <span className="detail-value-grid">{selectedItem.linearProjectionQuarterlyAchievementPercentage}%</span>
                        </div>
                    </div>

                    <h3 className="modal-section-header">Other Information</h3>
                    <div className="modal-grid">
                        <div className="detail-item">
                            <span className="detail-label-grid">Status</span>
                            <span className="detail-value-grid text-success bold">{selectedItem.status}</span>
                        </div>
                        <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                            <span className="detail-label-grid">Comments</span>
                            <span className="detail-value-grid">{selectedItem.comment || 'None'}</span>
                        </div>
                    </div>

                    {selectedItem.payments && selectedItem.payments.length > 0 && (
                        <>
                            <h3 className="modal-section-header">Payment History</h3>
                            {selectedItem.payments.map((payment, idx) => (
                                <div key={idx} style={{ background: '#fafbfc', padding: '12px 15px', borderRadius: '8px', marginBottom: '8px', border: '1px solid #f0f0f0' }}>
                                    <div className="modal-grid" style={{ marginBottom: 0 }}>
                                        <div className="detail-item">
                                            <span className="detail-label-grid">Date</span>
                                            <span className="detail-value-grid">{payment.paymentdate}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label-grid">Reference ID</span>
                                            <span className="detail-value-grid">{payment.referenceID}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label-grid">Document</span>
                                            <span className="detail-value-grid">{payment.paymentDocument}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label-grid">Bonus Paid (USD)</span>
                                            <span className="detail-value-grid">{parseFloat(payment.bonusUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProgramDetailModal;
