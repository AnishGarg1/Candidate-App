import React, { useEffect } from 'react';
import JobCard from './JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { incrementOffset } from '../redux/slices/JobsSlice';

const JobsBoard = () => {
  const dispatch = useDispatch();
  const { jobs, totalCount, offset } = useSelector(state => state.jobs);
  const limit = 10; // Number of jobs to fetch per request

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        // Check if user has scrolled to the bottom of the page with a buffer of 5px
        if (jobs.length < totalCount && (totalCount - jobs.length) >= limit) {
          // If there are more jobs to fetch
        //   console.log("Scrolled to bottom");
          dispatch(incrementOffset()); // Increment offset to fetch more jobs
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, jobs.length, totalCount, limit]);

  return (
    <div>
      <h2>All Jobs</h2>
      <div className="job-card-container">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsBoard;
