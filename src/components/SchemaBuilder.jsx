import React, { useState } from "react";
import FieldRow from "./FieldRow.jsx";
import JsonPreview from "./JsonPreview.jsx";

const SchemaBuilder = () => {
  const [fields, setFields] = useState([]);

  const defaultField = () => ({
    id: Math.random().toString(36).substring(2, 9),
    key: "",
    type: "String",
    children: [],
  });

  const defaultValueByType = {
    String: "STRING",
    Number: "number",
  };

  const generateJSON = (fields) => {
    const result = {};
    for (const field of fields) {
      if (!field.key) continue;
      if (field.type === "Nested") {
        result[field.key] = generateJSON(field.children || []);
      } else {
        result[field.key] = defaultValueByType[field.type];
      }
    }
    return result;
  };

  const updateField = (index, updated) => {
    const updatedFields = [...fields];
    updatedFields[index] = updated;
    setFields(updatedFields);
  };

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const addField = () => {
    setFields([...fields, defaultField()]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full w-full">
      
      {/* Left Panel - Schema Builder */}
      <div className="w-full lg:flex-[2]">
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 min-h-[400px]">
          <h2 className="text-2xl font-bold text-gray-800">Schema Builder</h2>

          {fields.length === 0 && (
            <div className="text-gray-500 text-sm italic">
              No fields added yet. Click below to add one.
            </div>
          )}

          {fields.map((field, index) => (
            <FieldRow
              key={field.id}
              field={field}
              onChange={(updated) => updateField(index, updated)}
              onDelete={() => deleteField(index)}
            />
          ))}

          <button
            onClick={addField}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <span className="text-lg">＋</span> Add Field
          </button>
        </div>
      </div>

      {/* Right Panel - JSON Preview */}
      <div className="w-full lg:flex-[1.2] flex flex-col">
        <div className="bg-gray-50 rounded-2xl shadow-inner p-6 flex-grow overflow-auto min-h-[400px] max-h-[80vh]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            JSON Preview
          </h2>
          <JsonPreview json={generateJSON(fields)} />
        </div>
      </div>
    </div>
  );
};

export default SchemaBuilder;
