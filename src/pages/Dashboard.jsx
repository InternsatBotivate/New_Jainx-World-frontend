import { useState, useMemo, useRef, useEffect, useCallback } from "react";

import Header from "../components/Header";
import SummarySection from "../components/SummarySection";
import ProgramTable from "../components/ProgramTable";
import ProgramDetailModal from "../components/ProgramDetailModal";
import Footer from "../components/Footer";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const BASE_URL = import.meta.env.VITE_FRONTEND_API_KEY + "/api/hp/programs";

function Dashboard() {
  // Partner config map
  const PARTNERS = {
    JAINX_WORLD: { name: "JAINX WORLD", partnerId: "991002342603" },
    JAINX_ITG: { name: "JAINX LAPTOP AND COMPUTER WORLD ITG", partnerId: "70584957" },
    JAINX_INDIA: { name: "JAINX INDIA", partnerId: "991001314186" },
  };

  const [selectedPartner, setSelectedPartner] = useState("JAINX_WORLD");
  const [searchedPartner, setSearchedPartner] = useState("JAINX_WORLD"); // snapshot on Search click
  const [partnerId, setPartnerId] = useState(PARTNERS.JAINX_WORLD.partnerId);
  const [quarter, setQuarter] = useState("Q1-26");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actualData, setActualData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dropdown filter states
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBU, setFilterBU] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const intervalRef = useRef(null);

  // Sync partnerId when selectedPartner changes
  useEffect(() => {
    setPartnerId(PARTNERS[selectedPartner]?.partnerId || "");
    setError(null); // Clear error immediately on change to show we are trying again
  }, [selectedPartner, quarter]);

  // Automated fetch with debounce to prevent spamming the backend (Industrial Standard)
  useEffect(() => {
    if (!partnerId || !quarter) return;

    const handler = setTimeout(() => {
      handleSearchClick();
    }, 400); // 400ms debounce

    return () => clearTimeout(handler);
  }, [selectedPartner, quarter, partnerId, page, pageSize]); // Trigger on any filter change

  const fetchSearchData = useCallback(async (params) => {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  }, []);

  const handleSearchClick = useCallback(async () => {
    const params = { quarter, partnerId, page, pageSize, partner: selectedPartner };

    try {
      setLoading(true);
      setError(null);
      const result = await fetchSearchData(params);
      setActualData(result);
      setSearchedPartner(selectedPartner); // ONLY update snapshot on success

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
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [quarter, partnerId, page, pageSize, selectedPartner, fetchSearchData]);

  /* ================= CLEANUP ================= */

  useEffect(() => {
    // Initial fetch is now handled by the selectedPartner/quarter effect
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const summary = useMemo(() => {
    if (!actualData.data || actualData.data.length === 0) return null;

    const validData = actualData.data;
    const totalTarget = validData.reduce(
      (acc, curr) =>
        acc +
        (parseFloat(curr.targetLC) || parseFloat(curr.targetUSD) * 83 || 0),
      0,
    );
    const totalAchievement = validData.reduce(
      (acc, curr) =>
        acc +
        (parseFloat(curr.actualsForAchievementLC) ||
          parseFloat(curr.actualsForAchievementUSD) * 83 ||
          0),
      0,
    );
    const totalBonus = validData.reduce(
      (acc, curr) =>
        acc + (parseFloat(curr.bonusLC) || parseFloat(curr.bonusUSD) * 83 || 0),
      0,
    );

    const achievementPct =
      totalTarget > 0
        ? ((totalAchievement / totalTarget) * 100).toFixed(2)
        : "0.00";

    return {
      programQuarter: validData[0]?.programQuarter || quarter,
      partnerName: PARTNERS[searchedPartner]?.name || validData[0]?.partnerName || "Unknown",
      partnerLocationID: PARTNERS[searchedPartner]?.partnerId || validData[0]?.partnerLocationID || partnerId,
      totalRecords: actualData.data.length,
      currentPage: actualData.currentPage,
      totalPages: actualData.pageCount,
      totalTarget: totalTarget.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      }),
      totalAchievement: totalAchievement.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      }),
      achievementPct: achievementPct + "%",
      totalBonus: totalBonus.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      }),
    };
  }, [quarter, partnerId, searchedPartner, actualData]);

  // Filter data based on dropdowns + search
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
          (d.scheme && d.scheme.toLowerCase().includes(q)) ||
          (d.category && d.category.toLowerCase().includes(q)) ||
          (d.bu && d.bu.toLowerCase().includes(q)) ||
          (d.subBU && d.subBU.toLowerCase().includes(q)) ||
          (d.type && d.type.toLowerCase().includes(q)) ||
          (d.status && d.status.toLowerCase().includes(q)),
      );
    }

    return filtered;
  }, [filterCategory, filterBU, filterStatus, searchQuery, actualData]);

  return (
    <div className="dashboard-container">
      <Header
        partnerId={partnerId}
        setPartnerId={setPartnerId}
        selectedPartner={selectedPartner}
        setSelectedPartner={setSelectedPartner}
        partners={PARTNERS}
        quarter={quarter}
        setQuarter={setQuarter}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleSearchClick={handleSearchClick}
        loading={loading}
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

      {!loading && error && (
        <div
          style={{
            border: "1px solid #ff4d4f",
            backgroundColor: "#fff2f0",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            color: "#cf1322",
          }}
        >
          <h3>⚠ Error</h3>
          <p>{error}</p>
          <button
            onClick={handleSearchClick}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              border: "none",
              backgroundColor: "#ff4d4f",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {!error && (
        <div className="program-list">
          <ProgramTable
            data={filteredData}
            onView={setSelectedItem}
            loading={loading}
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
