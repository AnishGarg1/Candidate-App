import React, { useEffect } from 'react';
import JobsBoard from './components/JobsBoard';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs, setTotalCount, incrementOffset } from './redux/slices/JobsSlice';

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
    <div className="App">
      <header className="App-header">
        <h1>Candidate Application Platform</h1>
      </header>
      <main>
        <JobsBoard />
      </main>
    </div>
  );
};

export default App;
