import React, { useEffect, useState } from "react";

const OptionForm = ({ questionId, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    text: "",
    correct: false,
    questionId: questionId,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="border p-4 rounded mt-4 bg-gray-50">
      <h3 className="text-md font-semibold mb-2">
        {initialData ? "Edit Option" : "Add New Option"}
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Option text"
          value={formData.text}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="correct"
            checked={formData.correct}
            onChange={handleChange}
          />
          Correct Answer?
        </label>

        <div className="mt-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mr-3"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OptionForm;
