import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="logo">
        <img src={job.logoUrl} alt={job.companyName} />
      </div>
      <div className="job-details">
        <h3>{job.jobRole}</h3>
        <p>Company: {job.companyName}</p>
        <p>Location: {job.location}</p>
        <p>Description: {truncateDescription(job.jobDetailsFromCompany)}</p>
        <p>Experience Required: {job.minExp ? job.minExp : 'Not specified'} - {job.maxExp ? job.maxExp : 'Not specified'} years</p>
        <p>Salary: {job.minJdSalary ? `$${job.minJdSalary}` : 'Not specified'} - {job.maxJdSalary ? `$${job.maxJdSalary}` : 'Not specified'} {job.salaryCurrencyCode}</p>
        <button>Apply</button>
      </div>
    </div>
  );
};

const truncateDescription = (description) => {
  const maxLength = 150; // Maximum length of description to display
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...'; // Truncate description if it exceeds maxLength
  }
  return description;
};

export default JobCard;
