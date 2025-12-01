import React, { useEffect, useState } from "react";
import api from "../api/axios";

function SubjectPage() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    api
      .get("/subjects")
      .then((res) => setSubjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Select Subject</h2>

      {subjects.map((sub) => (
        <div
          key={sub}
          onClick={() => (window.location.href = `/quiz/${sub}`)}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          {sub}
        </div>
      ))}
    </div>
  );
}

export default SubjectPage;
