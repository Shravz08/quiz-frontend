import React, { useEffect, useState } from "react";
import {
  getAllOptions,
  deleteOption,
  createOption,
  updateOption,
} from "../../services/optionService";

import OptionForm from "../../components/OptionForm";

const AdminOptionsPage = () => {
  const [options, setOptions] = useState([]);
  const [editingOption, setEditingOption] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadOptions = async () => {
    const res = await getAllOptions();
    setOptions(res.data);
  };

  useEffect(() => {
    loadOptions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this option?")) {
      await deleteOption(id);
      loadOptions();
    }
  };

  const handleSave = async (formData) => {
    if (editingOption) {
      await updateOption(editingOption.id, formData);
    } else {
      await createOption(formData);
    }
    setShowForm(false);
    setEditingOption(null);
    loadOptions();
  };

  return (
    <div className="container mt-5">
      <h2>Manage Options</h2>

      <button
        className="btn btn-primary my-3"
        onClick={() => {
          setEditingOption(null);
          setShowForm(true);
        }}
      >
        + Add Option
      </button>

      {showForm && (
        <OptionForm
          initialData={editingOption}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Question ID</th>
            <th>Option Text</th>
            <th>Is Correct?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {options.map((opt) => (
            <tr key={opt.id}>
              <td>{opt.id}</td>
              <td>{opt.questionId}</td>
              <td>{opt.text}</td>
              <td>{opt.isCorrect ? "Yes" : "No"}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => {
                    setEditingOption(opt);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => handleDelete(opt.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOptionsPage;
