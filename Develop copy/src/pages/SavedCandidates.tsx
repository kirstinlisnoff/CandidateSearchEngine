import { useEffect, useState } from 'react';
import { MinusCircle } from 'lucide-react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);
  
    const handleReject = (candidateId: number) => {
    const updated = savedCandidates.filter(c => c.id !== candidateId);
    setSavedCandidates(updated);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates.</p>
      ) : (
        <table className='table'>
          <thead className='table-header'>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {savedCandidates.map(candidate => (
              <tr key={candidate.id}>
                <td>
                  <img 
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    width="50"
                    height="50"
                    style={{ borderRadius: '15%' }}
                    className='avatar'
                  />
                </td>
                <td>
                  {candidate.name ? `${candidate.name} (${candidate.login})` : candidate.login}
                </td>
                <td>{candidate.location || '—'}</td>
                <td>{candidate.email || '—'}</td>
                <td>{candidate.company || '—'}</td>
                <td>{candidate.bio || '—'}</td>
                <td>
                  <button
                    onClick={() => handleReject(candidate.id)}
                   style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            
                    title="Reject Candidate"
                  >
                    <MinusCircle color="red" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default SavedCandidates;
