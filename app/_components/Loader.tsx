import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Loading...</h1>
        <div className="flex justify-center">
          <Loader2 className="text-blue-500 animate-spin" size={48} />
        </div>
        <p className="mt-4 text-gray-600">Please wait while we process your request.</p>
      </div>
    </div>
  );
};

export default Loader;