import React from 'react';

const emptyIllustration = '/empty-assets-placeholder.svg';

export default function EmptyState() {
  return (
    <div className="empty-state-container">
      <div className="empty-illustration-wrapper">
        <img
          src={emptyIllustration}
          alt="No Business Assets"
          className="empty-illustration"
        />
      </div>
      <p className="empty-state-text">
      No assets have been assigned to the user in the selected LOB. Please select a different LOB.
      </p>
    </div>
  );
}
