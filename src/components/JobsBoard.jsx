import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { incrementOffset } from '../redux/slices/JobsSlice';
import FilterJobs from './FilterJobs';

const JobsBoard = () => {
  const dispatch = useDispatch();
  const { jobs, totalCount } = useSelector(state => state.jobs);
  const limit = 10; // Number of jobs to fetch per request
  const [filterActive, setFilterActive] = useState(false); // State to track filter activity
  const [filters, setFilters] = useState({ // State to hold filter values
    minExp: '',
    companyName: '',
    location: '',
    remoteOnsite: 'Remote',
    techStack: '',
    role: '',
    minBasePay: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (jobs.length < totalCount && (totalCount - jobs.length) >= limit) {
          dispatch(incrementOffset());
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, jobs.length, totalCount, limit]);

  // Filter jobs based on active filters
  const filteredJobs = jobs.filter(job => (
    (filters.minExp === '' || (job.minExp && parseInt(job.minExp) >= parseInt(filters.minExp))) &&
    (filters.companyName === '' || (job.companyName && job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()))) &&
    (filters.location === '' || (job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()))) &&
    (filters.remoteOnsite === 'Remote' || job.remoteOnsite === filters.remoteOnsite) &&
    (filters.techStack === '' || (job.techStack && job.techStack.toLowerCase().includes(filters.techStack.toLowerCase()))) &&
    (filters.role === '' || (job.role && job.role.toLowerCase().includes(filters.role.toLowerCase()))) &&
    (filters.minBasePay === '' || (job.minBasePay && parseInt(job.minBasePay) >= parseInt(filters.minBasePay)))
  ));

  // Log filters whenever they change
  useEffect(() => {
    console.log("Filters after change:", filters);
    setFilterActive(Object.values(filters).some(value => value !== '')); // Check if any filters are active
  }, [filters]);

  return (
    <div className="bg-gray-100 py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">All Jobs</h2>
      <FilterJobs setFilterActive={setFilterActive} setFilters={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filterActive ? (
          // Render filtered jobs if filters are active
          filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))
        ) : (
          // Render original jobs list if no filters are active
          jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default JobsBoard;
