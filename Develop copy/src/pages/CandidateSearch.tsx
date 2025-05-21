import { useState, useEffect } from 'react';
// import { searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import { PlusCircle, MinusCircle } from 'lucide-react';


const CandidateSearch = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

//get saved candidates from localstorage
useEffect(() => {
  const saved = localStorage.getItem('savedCandidates');
  if (saved) {
    setSavedCandidates(JSON.parse(saved));
  }
  fetchCandidates();
}, []);

//fetch random list of candidates from github
const fetchCandidates = async () => {
  setLoading(true);
  setError(null);
  setNoMoreCandidates(false);

  try {
    // Step 1: Get basic users
    const response = await fetch('https://api.github.com/users?since=135');
    const basicUsers = await response.json();

    // Step 2: Fetch full profile for each user
    const detailedUsers = await Promise.all(
      basicUsers.slice(0, 5).map(async (user: any) => {
        const res = await fetch(`https://api.github.com/users/${user.login}`);
        return await res.json();
      })
    );

    if (detailedUsers.length > 0) {
      setCandidates(detailedUsers);
      setCurrentCandidate(detailedUsers[0]);
    } else {
      setError('No candidates found');
    }
  } catch (error) {
    console.error('Error fetching candidates:', error);
    setError('Error fetching candidates');
  } finally {
    setLoading(false);
  }
};



//save candidate to localstorage

const saveCandidate = (candidate: Candidate) => {
  if (savedCandidates.find((c) => c.id === candidate.id)) {
    setError('Candidate already saved');
    return;
}
const updatedSavedCandidates = [...savedCandidates, candidate];
setSavedCandidates(updatedSavedCandidates);
localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
nextCandidate();
};

const nextCandidate = () => {
  if (noMoreCandidates || candidates.length === 0)
    return;

    const currentIndex = candidates.findIndex(
      (c) => c.id === currentCandidate?.id
    );
    if (currentIndex === -1) {
  setCurrentCandidate(candidates[0]);
  return;
}

   
  const nextIndex = currentIndex + 1;
  if (nextIndex < candidates.length) {
    setCurrentCandidate(candidates[nextIndex]);
  } else {
    setNoMoreCandidates(true);
  }
}
// const resetCandidates = () => {
//   setNoMoreCandidates(false);
//   setCurrentCandidate(null);
// }

  return (
    <div>
      <h1>Candidate Search</h1>
      {loading && <p>Loading candidates...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {!loading && currentCandidate && !noMoreCandidates ? (
        <div>
        <div className='card'>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} width="100" />
           <div className='card-body'>
             <h2>
              {currentCandidate.name
              ? `${currentCandidate.name} (${currentCandidate.login})`
                : currentCandidate.login}
             </h2>
            <div className='card-content'>
              {currentCandidate.location && <p><strong>Location:</strong> {currentCandidate.location}</p>}
              {currentCandidate.email && <p><strong>Email:</strong> {currentCandidate.email}</p>}
              {currentCandidate.company && <p><strong>Company:</strong> {currentCandidate.company}</p>}
              {currentCandidate.bio && <p><strong>Bio:</strong> {currentCandidate.bio}</p>}
              </div>
           </div>
        </div>
        <div className='circles'>
           <button 
              onClick={nextCandidate}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              title="Next Candidate"
                >
              <MinusCircle color="red" size={36} />
            </button>
          <button onClick={() => saveCandidate(currentCandidate)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              title= "Save Candidate">
              <PlusCircle color="green" size={36} />
            </button>
            </div>
          
        </div>
      ) : (
        <p>{noMoreCandidates ? "No more candidates." : "No candidates available."}</p>
      )}

      {/* {savedCandidates.length > 0 && (
        <div>
          <h3>Saved Candidates</h3>
          <ul>
            {savedCandidates.map((candidate) => (
              <li key={candidate.id}>{candidate.login}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={resetCandidates}>Reset Candidates</button> */}
    </div>
  );
};

export default CandidateSearch;
