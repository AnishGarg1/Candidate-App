import React, { useState } from 'react';

const JobCard = ({ job }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const capitalize = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const truncateDescription = (description) => {
    const maxLength = 150; // Maximum length of description to display
    if (description.length > maxLength && !showMore) {
      return description.substring(0, maxLength) + '...'; // Truncate description if it exceeds maxLength
    }
    return description;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <div className="flex items-center justify-center bg-gray-100 h-40">
        <img src={job.logoUrl} alt={job.companyName} className="w-32 h-32 object-contain" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{capitalize(job.jobRole)}</h3>
        <p className="text-gray-600">Company: {job.companyName}</p>
        <p className="text-gray-600">Location: {capitalize(job.location)}</p>
        <p className="text-gray-700 mt-2">{truncateDescription(job.jobDetailsFromCompany)}</p>
        {job.jobDetailsFromCompany.length > 150 && (
          <button onClick={toggleShowMore} className="text-blue-500 font-semibold hover:underline focus:outline-none mt-2">
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-gray-700">Experience Required: {job.minExp ? job.minExp : 'Not specified'} - {job.maxExp ? job.maxExp : 'Not specified'} years</p>
            <p className="text-gray-700">Salary: {job.minJdSalary ? `$${job.minJdSalary}` : 'Not specified'} - {job.maxJdSalary ? `$${job.maxJdSalary}` : 'Not specified'} {job.salaryCurrencyCode}</p>
          </div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
