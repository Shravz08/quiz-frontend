import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../../services/QuestionService";
import {
  getAllOptions,
  createOption,
  updateOption,
  deleteOption,
} from "../../services/optionService";

import OptionList from "../../components/OptionList";
import OptionForm from "../../components/OptionForm";

const QuestionDetailsPage = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [editingOption, setEditingOption] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    const q = await getQuestionById(id);
    setQuestion(q.data);

    const allOpt = await getAllOptions();
    const related = allOpt.data.filter((o) => o.questionId == id);

    setOptions(related);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data) => {
    if (editingOption) {
      await updateOption(editingOption.id, data);
    } else {
      await createOption({
        ...data,
        questionId: parseInt(id),
      });
    }

    setEditingOption(null);
    setShowForm(false);
    loadData();
  };

  const handleDelete = async (optId) => {
    await deleteOption(optId);
    loadData();
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className="p-5 container mx-auto">
      <h1 className="text-2xl font-bold">{question.text}</h1>
      <p className="text-gray-600 mt-2">Question ID: {id}</p>

      <button
        onClick={() => {
          setEditingOption(null);
          setShowForm(true);
        }}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Option
      </button>

      {showForm && (
        <OptionForm
          initialData={editingOption}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
          questionId={id}
        />
      )}

      <OptionList
        options={options}
        onEdit={(opt) => {
          setEditingOption(opt);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default QuestionDetailsPage;
