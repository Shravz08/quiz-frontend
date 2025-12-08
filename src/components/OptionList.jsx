import React from "react";

const OptionList = ({ options, onEdit, onDelete }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Options</h3>
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Text</th>
            <th className="p-2">Correct?</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {options.map((opt) => (
            <tr key={opt.id} className="border-t">
              <td className="p-2">{opt.text}</td>
              <td className="p-2">
                {opt.correct ? (
                  <span className="text-green-600 font-bold">✔</span>
                ) : (
                  <span className="text-red-600 font-bold">✖</span>
                )}
              </td>
              <td className="p-2">
                <button
                  onClick={() => onEdit(opt)}
                  className="text-blue-600 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(opt.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {options.length === 0 && (
            <tr>
              <td colSpan="3" className="p-3 text-gray-500 text-center">
                No options added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OptionList;
