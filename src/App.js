import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs, setTotalCount, incrementOffset } from './redux/slices/JobsSlice';
import { FaBriefcase } from 'react-icons/fa';
import JobsBoard from './components/JobsBoard';
import "./App.css"

const App = () => {
  const dispatch = useDispatch();
  const { jobs, totalCount, offset } = useSelector(state => state.jobs);
  const limit = 10; // Number of jobs to fetch per request

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "limit": limit,
            "offset": offset
          })
        });
        const data = await response.json();

        // Append the fetched jobs to the existing job list in Redux
        dispatch(setJobs([...jobs, ...data.jdList])); // Append the new jobs to the existing list
        dispatch(setTotalCount(data.totalCount));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [dispatch, offset]); // Fetch jobs when offset or jobs change

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaBriefcase className="text-2xl mr-2" />
            <h1 className="text-2xl font-bold">Job Application Portal</h1>
          </div>
          <button className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">Post a Job</button>
        </div>
      </header>
      <main className="p-4 flex-grow">
        <JobsBoard />
      </main>
    </div>
  );
};

export default App;
