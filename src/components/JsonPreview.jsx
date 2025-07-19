import React from "react";

const JsonPreview = ({ json }) => (
  <div className="h-full w-full overflow-y-auto bg-gray-100 rounded-2xl p-4 shadow-inner">
    <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap break-words">
      {JSON.stringify(json, null, 2)}
    </pre>
  </div>
);

export default JsonPreview;
