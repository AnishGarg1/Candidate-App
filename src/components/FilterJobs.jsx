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

    setLocalFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));

    // Pass the filters to the parent component
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));

    // Check if any filter is active
    const activeFilters = Object.values({
      ...filters,
      [name]: value // Update the specific filter being changed
    }).some(value => value !== '');
    setFilterActive(activeFilters); // Pass filter state to parent
  };

  return (
    <div className="job-filter">
      <form>
        <label htmlFor="minExp">Min Experience:</label>
        <select id="minExp" name="minExp" value={filters.minExp} onChange={handleFilterChange}>
          <option value="">Any</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <label htmlFor="companyName">Company Name:</label>
        <input type="text" id="companyName" name="companyName" value={filters.companyName} onChange={handleFilterChange} />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={filters.location} onChange={handleFilterChange} />

        <label htmlFor="remoteOnsite">Remote/On-site:</label>
        <select id="remoteOnsite" name="remoteOnsite" value={filters.remoteOnsite} onChange={handleFilterChange}>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <label htmlFor="techStack">Tech Stack:</label>
        <input type="text" id="techStack" name="techStack" value={filters.techStack} onChange={handleFilterChange} />

        <label htmlFor="role">Role:</label>
        <select id="role" name="role" value={filters.role} onChange={handleFilterChange}>
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

        <label htmlFor="minBasePay">Min Base Pay:</label>
        <select id="minBasePay" name="minBasePay" value={filters.minBasePay} onChange={handleFilterChange}>
          <option value="">Any</option>
          {[...Array(10)].map((_, i) => (
            <option key={i * 10} value={i * 10}>{i * 10}L</option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default FilterJobs;
