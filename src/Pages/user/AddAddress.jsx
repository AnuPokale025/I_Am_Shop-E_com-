import React from "react";

const AddAddress = () => {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add Address</h2>

      <input
        type="text"
        placeholder="Full Address"
        className="w-full border p-3 rounded mb-4"
      />

      <button className="bg-green-600 text-white px-6 py-3 rounded">
        Save Address
      </button>
    </div>
  );
};

export default AddAddress;