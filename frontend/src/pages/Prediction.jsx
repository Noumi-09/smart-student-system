import { useState } from "react";
import axios from "axios";

function Prediction() {
  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState("");

  const predict = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/predict",
        { attendance: Number(attendance), marks: Number(marks) },
        {
          headers: {
            Authorization: token
          }
        }
      );

      setResult(res.data.prediction);
    } catch (err) {
      console.log(err);
      setResult("Error predicting result");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Prediction</h2>

      <input
        placeholder="Attendance"
        value={attendance}
        onChange={(e) => setAttendance(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />

      <br /><br />

      <button onClick={predict}>Predict</button>

      <h3>Result: {result}</h3>
    </div>
  );
}

export default Prediction;