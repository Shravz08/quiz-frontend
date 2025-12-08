import React, { useState, useEffect } from "react";

const QuestionForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="card p-4 mb-4">
      <h4>{initialData ? "Edit Question" : "Add New Question"}</h4>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          type="text"
          name="questionText"
          placeholder="Question Text"
          value={formData.questionText}
          onChange={handleChange}
          required
        />

        {[1, 2, 3, 4].map((n) => (
          <input
            key={n}
            className="form-control my-2"
            type="text"
            name={`option${n}`}
            placeholder={`Option ${n}`}
            value={formData[`option${n}`]}
            onChange={handleChange}
            required
          />
        ))}

        <input
          className="form-control my-2"
          type="text"
          name="correctAnswer"
          placeholder="Correct Answer"
          value={formData.correctAnswer}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success mt-3" type="submit">
          Save
        </button>
        <button
          className="btn btn-secondary mt-3 mx-2"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
