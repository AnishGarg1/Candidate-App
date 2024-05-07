import React, { useState } from 'react';

const FilterJobs = ({ setFilterActive, setFilters }) => {
  const [filters, setLocalFilters] = useState({
    minExp: '',
    companyName: '',
    location: '',
    remoteOnsite: 'Remote',
    techStack: '',
    role: '',
    minBasePay: '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    // Pass the filters to the parent component
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    // Check if any filter is active
    const activeFilters = Object.values({
      ...filters,
      [name]: value, // Update the specific filter being changed
    }).some((value) => value !== '');
    setFilterActive(activeFilters); // Pass filter state to parent
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label htmlFor="minExp" className="block text-sm font-medium text-gray-700">
            Min Experience:
          </label>
          <select
            id="minExp"
            name="minExp"
            value={filters.minExp}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Any</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name:
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={filters.companyName}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="remoteOnsite" className="block text-sm font-medium text-gray-700">
            Remote/On-site:
          </label>
          <select
            id="remoteOnsite"
            name="remoteOnsite"
            value={filters.remoteOnsite}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">
            Tech Stack:
          </label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={filters.techStack}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Any</option>
            <optgroup label="Engineering">
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              {/* Add more roles */}
            </optgroup>
            <optgroup label="Data Analyst">
              <option value="Data Engineer">Data Engineer</option>
              <option value="Data Analyst">Data Analyst</option>
              {/* Add more roles */}
            </optgroup>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="minBasePay" className="block text-sm font-medium text-gray-700">
            Min Base Pay:
          </label>
          <select
            id="minBasePay"
            name="minBasePay"
            value={filters.minBasePay}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Any</option>
            {[...Array(10)].map((_, i) => (
              <option key={i * 10} value={i * 10}>
                {i * 10}L
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FilterJobs;
