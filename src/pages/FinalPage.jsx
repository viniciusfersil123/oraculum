import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function FinalPage() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <div className="final-container">
      <h2>Call Of Destiny</h2>
      <h3>Your Sign: {signName}</h3>

      {Array.from(searchParams.entries()).map(([key, value]) => (
        <h3 key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
        </h3>
      ))}
    </div>
  );
}

export default FinalPage;
