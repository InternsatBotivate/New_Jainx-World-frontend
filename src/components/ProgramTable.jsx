import ClipLoader from "react-spinners/ClipLoader";

function ProgramTable({ data, onView, loading }) {
  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px 0" }}
      >
        <ClipLoader size={40} color="#007bff" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>
        No programs found.
      </div>
    );
  }

  return (
    <table className="program-table">
      <thead>
        <tr>
          <th style={{ width: "50px" }}>View</th>
          <th>Scheme / Category</th>
          <th>BU / Sub-BU</th>
          <th>Type</th>
          <th>Target</th>
          <th>Actuals for Achievement</th>
          <th>Actuals for Rebate w/o Exclusion</th>
          <th>Achievement %</th>
          <th>Actuals for Rebate</th>
          <th>Bonus</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="program-row">
            <td data-label="View">
              <div className="eye-icon" onClick={() => onView(item)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
            </td>
            <td data-label="Scheme / Category">
              <div style={{ fontWeight: "bold", color: "#4facfe" }}>
                {item.scheme}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#888" }}>
                {item.category}
              </div>
            </td>
            <td data-label="BU / Sub-BU">
              <div style={{ fontWeight: "bold" }}>{item.bu}</div>
              <div style={{ fontSize: "0.8rem", color: "#888" }}>
                {item.subBU}
              </div>
            </td>
            <td data-label="Type">
              <div style={{ fontSize: "0.85rem" }}>{item.type}</div>
            </td>
            <td data-label="Target">
              {(
                parseFloat(item.targetLC) ||
                parseFloat(item.targetUSD) * 83 ||
                0
              ).toLocaleString("en-IN")}
            </td>
            <td data-label="Achievement">
              {(
                parseFloat(item.actualsForAchievementLC) ||
                parseFloat(item.actualsForAchievementUSD) * 83 ||
                0
              ).toLocaleString("en-IN")}
            </td>
            <td data-label="Actuals for Rebate w/o Exclusion">
              {item.actualsForPayOnLC}
            </td>
            <td data-label="Achievement %">
              <span
                className={
                  parseFloat(item.quarterlyAchievementPercentage) > 100
                    ? "text-success bold"
                    : ""
                }
              >
                {item.quarterlyAchievementPercentage}%
              </span>
            </td>
            <td data-label="Actuals for Rebate">
              {item.actualForRebateLC}
            </td>

            <td data-label="Bonus">
              {(
                parseFloat(item.bonusLC) ||
                parseFloat(item.bonusUSD) * 83 ||
                0
              ).toLocaleString("en-IN")}
            </td>
            <td data-label="Status">
              <span
                className={`badge ${item.status === "Paid" ? "badge-paid" : "badge-estimated"}`}
              >
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProgramTable;
