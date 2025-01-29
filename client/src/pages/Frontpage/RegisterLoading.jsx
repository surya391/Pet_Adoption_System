import React from "react";

const RegisterLoading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default RegisterLoading;
