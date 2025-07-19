import React from 'react';

const FieldRow = ({ field, onChange, onDelete }) => {
  
  const updateField = (updates) => {
    onChange({ ...field, ...updates });
  };

  const handleChildChange = (index, updatedChild) => {
    const newChildren = [...(field.children || [])];
    newChildren[index] = updatedChild;
    updateField({ children: newChildren });
  };

  const handleChildDelete = (index) => {
    const newChildren = field.children?.filter((_, i) => i !== index) || [];
    updateField({ children: newChildren });
  };

  const addChild = () => {
    const newField = {
      id: Math.random().toString(36).substring(2, 9),
      key: '',
      type: 'String',
      children: [],
    };
    updateField({ children: [...(field.children || []), newField] });
  };

  return (
    <div className="border-l-2 border-gray-300 pl-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Field key"
          value={field.key}
          onChange={(e) => updateField({ key: e.target.value })}
          className="border border-gray-300 px-2 py-1 rounded w-1/3"
        />

        <select
          value={field.type}
          onChange={(e) => {
            const newType = e.target.value;
            updateField({
              type: newType,
              children: newType === 'Nested' ? field.children || [] : undefined,
            });
          }}
          className="border border-gray-300 px-2 py-1 rounded"
        >
          <option value="String">String</option>
          <option value="Number">Number</option>
          <option value="Nested">Nested</option>
        </select>

        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>

      {field.type === 'Nested' && (
        <div className="ml-4">
          {field.children?.map((child, idx) => (
            <FieldRow
              key={child.id}
              field={child}
              onChange={(updated) => handleChildChange(idx, updated)}
              onDelete={() => handleChildDelete(idx)}
            />
          ))}
          <button
            onClick={addChild}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            + Add Nested Field
          </button>
        </div>
      )}
    </div>
  );
};

export default FieldRow;
