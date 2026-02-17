import { useState, useMemo, useRef, useEffect, useCallback } from "react";

import Header from "../components/Header";
import SummarySection from "../components/SummarySection";
import ProgramTable from "../components/ProgramTable";
import ProgramDetailModal from "../components/ProgramDetailModal";
import Footer from "../components/Footer";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const BASE_URL = "http://localhost:5000/api/hp/programs";

function Dashboard() {
  const [partnerId, setPartnerId] = useState("991002342603");
  const [quarter, setQuarter] = useState("Q1-26");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actualData, setActualData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterBU, setFilterBU] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const intervalRef = useRef(null);

  /* ================= API CALL ================= */

  const fetchSearchData = useCallback(async (params) => {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  }, []);

  /* ================= SEARCH ================= */

  const handleSearchClick = useCallback(async () => {
    const params = { quarter, partnerId, page, pageSize };

    try {
      setLoading(true);
      setError(null);

      const result = await fetchSearchData(params);
      setActualData(result);

      // Clear previous auto refresh
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Auto refresh every 1 minute
      intervalRef.current = setInterval(async () => {
        try {
          const refreshed = await fetchSearchData(params);
          setActualData(refreshed);
        } catch (err) {
          console.error("Auto refresh failed", err);
        }
      }, 60000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [quarter, partnerId, page, pageSize, fetchSearchData]);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    handleSearchClick();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // only once on mount

  /* ================= SUMMARY ================= */

  const summary = useMemo(() => {
    if (!actualData.data || actualData.data.length === 0) return null;

    const validData = actualData.data;

    const totalTarget = validData.reduce(
      (acc, curr) => acc + (parseFloat(curr.targetUSD) || 0),
      0
    );

    const totalAchievement = validData.reduce(
      (acc, curr) =>
        acc + (parseFloat(curr.actualsForAchievementUSD) || 0),
      0
    );

    const totalBonus = validData.reduce(
      (acc, curr) => acc + (parseFloat(curr.bonusUSD) || 0),
      0
    );

    const achievementPct =
      totalTarget > 0
        ? ((totalAchievement / totalTarget) * 100).toFixed(2)
        : "0.00";

    return {
      programQuarter: validData[0]?.programQuarter || quarter,
      partnerName: validData[0]?.partnerName || "Unknown",
      partnerLocationID:
        validData[0]?.partnerLocationID || partnerId,
      totalRecords: validData.length,
      currentPage: actualData.currentPage,
      totalPages: actualData.pageCount,
      totalTarget: totalTarget.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      totalAchievement: totalAchievement.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      achievementPct: achievementPct + "%",
      totalBonus: totalBonus.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  }, [quarter, partnerId, actualData]);

  /* ================= FILTER ================= */

  const filteredData = useMemo(() => {
    if (!actualData.data) return [];
    let filtered = [...actualData.data];

    if (filterCategory) {
      filtered = filtered.filter((d) => d.category === filterCategory);
    }

    if (filterBU) {
      filtered = filtered.filter((d) => d.bu === filterBU);
    }

    if (filterStatus) {
      filtered = filtered.filter((d) => d.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (d) =>
          d.scheme?.toLowerCase().includes(q) ||
          d.category?.toLowerCase().includes(q) ||
          d.bu?.toLowerCase().includes(q) ||
          d.subBU?.toLowerCase().includes(q) ||
          d.type?.toLowerCase().includes(q) ||
          d.status?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [filterCategory, filterBU, filterStatus, searchQuery, actualData]);

  /* ================= UI ================= */

  return (
    <div className="dashboard-container">
      <Header
        partnerId={partnerId}
        setPartnerId={setPartnerId}
        quarter={quarter}
        setQuarter={setQuarter}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleSearchClick={handleSearchClick}
      />

      <SummarySection
        summary={summary}
        page={page}
        data={actualData.data}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterBU={filterBU}
        setFilterBU={setFilterBU}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <ClipLoader size={60} />
        </div>
      )}

      {!loading && error && (
        <div className="error-box">
          <h3>⚠ Error</h3>
          <p>{error}</p>
          <button onClick={handleSearchClick}>Retry</button>
        </div>
      )}

      {!error && (
        <div className="program-list">
          <ProgramTable
            data={filteredData}
            onView={setSelectedItem}
          />
        </div>
      )}

      <ProgramDetailModal
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <Footer />
    </div>
  );
}

export default Dashboard;
