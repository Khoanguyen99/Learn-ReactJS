
import { useState } from 'react';

function App() {
  
  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs'))
    return storageJobs ?? []
  })
  const handleSubmit = () => {
    if (job !== '') {
      setJobs(prev => {
        const newJobs = [...prev, job]
        // Save to local storage
        const jsonJobs = JSON.stringify(newJobs)
        localStorage.setItem('jobs', jsonJobs)
        return newJobs
      })
      setJob('')
    }
  }
  const handleDelete = (index) => {
    setJobs((prev) => {
      console.log(index)
      prev.splice(index, 1);
      const newList = [...prev];
      localStorage.setItem("jobs", JSON.stringify(newList));
      return newList;
    });
  };
  return (
    <div className="container">
      <h1 className='text-center'>To Do List</h1>
      <input 
        value={job}
        onChange={e => setJob(e.target.value)}
      /> &nbsp;
      <button className="btn btn-secondary" onClick={handleSubmit}>Add</button>
      <table className="table text-center mt-4">
        <thead>
          <tr>
            <th className='col-2 '>STT</th>
            <th className='col-5'>Content</th>
            <th className='col-5'>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index+1}>
              <td >{index + 1}</td>
              <td key={index} 
                  className='text-capitalize'>{job}
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(index)}>Delete</button>
                &nbsp;
                <button className='btn btn-warning'>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
