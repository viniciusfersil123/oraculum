import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function FinalPage() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const day = searchParams.get('day');
  const decade = searchParams.get('decade');

  return (
    <div className="final-container">
      <h2>Call Of Destiny</h2>
      <h3>Your Sign: {signName}</h3>
      <h3>Day of Birth: {day}</h3>
      <h3>Decade of Birth: {decade}</h3>
    </div>
  );
}

export default FinalPage;