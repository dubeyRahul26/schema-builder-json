import React from "react";
import SchemaBuilder from "./components/SchemaBuilder";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white drop-shadow-lg">
        JSON Schema Builder
      </h1>
      <SchemaBuilder />
    </div>
  );
};

export default App;
