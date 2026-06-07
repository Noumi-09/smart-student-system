import { useState } from "react";
import axios from "axios";

export default function AIPrediction() {
  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const API = process.env.REACT_APP_API_URL;

  const handlePredict = async () => {
    setError("");
    setResult(null);

    if (!attendance || !marks) {
      setError("Please enter both Attendance and Marks");
      return;
    }

    if (attendance < 0 || attendance > 100) {
      setError("Attendance must be between 0 and 100");
      return;
    }

    if (marks < 0 || marks > 100) {
      setError("Marks must be between 0 and 100");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/predict`,
        {
          attendance: Number(attendance),
          marks: Number(marks),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data.prediction);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Prediction failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAttendance("");
    setMarks("");
    setResult(null);
    setError("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          🎯 AI Student Performance Prediction
        </h2>

        <p style={styles.subtitle}>
          Enter student attendance and marks to predict performance.
        </p>

        <input
          type="number"
          min="0"
          max="100"
          placeholder="Attendance (%)"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          min="0"
          max="100"
          placeholder="Marks (0 - 100)"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handlePredict}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Predict"}
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          style={styles.resetButton}
        >
          Reset
        </button>

        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        {result && (
          <div
            style={{
              ...styles.result,
              backgroundColor:
                result.toLowerCase().includes("pass")
                  ? "#d1fae5"
                  : "#fee2e2",
              color:
                result.toLowerCase().includes("pass")
                  ? "#065f46"
                  : "#991b1b",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              Prediction Result
            </h3>

            <p>
              Student Status:
              <strong> {result.toUpperCase()}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#f3f4f6",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  title: {
    marginBottom: "10px",
    color: "#1f2937",
  },

  subtitle: {
    marginBottom: "20px",
    color: "#6b7280",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "15px",
  },

  resetButton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#6b7280",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },

  errorBox: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    borderRadius: "8px",
    fontWeight: "500",
  },

  result: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    fontWeight: "500",
  },
};