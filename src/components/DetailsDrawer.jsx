import React, { useState } from 'react';
import {
  Building2,
  Eye,
  EyeOff,
  Globe2,
  KeyRound,
  Link2,
  LockKeyhole,
  MapPin,
  Network,
  ShieldCheck,
  User,
  UserRoundCheck,
  X
} from 'lucide-react';

const assetDetails = [
  [Building2, 'Asset Name', 'Windows'],
  [Link2, 'Alias Name', 'Windows Server'],
  [User, 'Host Name', '52.0.181.55'],
  [MapPin, 'IP Address', '52.0.181.55'],
  [Globe2, 'Domain Name', '52.0.181.55'],
  [Network, 'Port', '3389']
];

const identityDetails = [
  [KeyRound, 'Access Type', 'Permanent'],
  [UserRoundCheck, 'Identity Category', 'Personal'],
  [Building2, 'Asset Alias Name', 'Windows Server'],
  [ShieldCheck, 'Identity Type', 'Master ID'],
  [UserRoundCheck, 'Digital Identity', 'clark.kent'],
  [Network, 'Port', '3389']
];

const linuxIdentityDetails = [
  [KeyRound, 'Access Type', 'Permanent'],
  [UserRoundCheck, 'Identity Category', 'Non Personal'],
  [Building2, 'Asset Alias Name', 'Linux'],
  [ShieldCheck, 'Identity Type', 'Master ID'],
  [UserRoundCheck, 'Digital Identity', 'adminuser'],
  [Network, 'Port', '22']
];

const credentialsDetails = [
  [KeyRound, 'Access Type', 'Permanent'],
  [UserRoundCheck, 'Identity Category', 'Personal'],
  [Building2, 'Asset Alias Name', 'Windows Server'],
  [ShieldCheck, 'Identity Type', 'Named ID'],
  [UserRoundCheck, 'Digital Identity', 'Rohith'],
  [Network, 'Port', '3389']
];

function DetailGrid({ items }) {
  return (
    <div className="details-grid">
      {items.map(([Icon, label, value]) => (
        <div className="details-entry" key={label}>
          <Icon size={18} aria-hidden="true" />
          <div>
            <p>{label}</p>
            <span>{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CredentialsForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('Rohith@12345');
  const [confirmation, setConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (confirmation === password) {
      setIsSubmitting(true);
      setTimeout(() => {
        localStorage.setItem('rohith_credentials', 'true');
        window.dispatchEvent(new Event('credentials-saved'));
        setIsSubmitting(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <form className="credentials-form" onSubmit={handleSubmit}>
      <h3>Digital Identities Credentials</h3>
      <label>
        User Name <b>*</b>
        <span className="details-input input-with-icon">
          <User size={15} />
          <input value="Rohith" readOnly aria-label="User Name" />
        </span>
      </label>
      <label>
        New Password <b>*</b>
        <span className="details-input input-with-icon">
          <LockKeyhole size={15} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-label="New Password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </span>
      </label>
      <label>
        Confirm Password <b>*</b>
        <span className="details-input input-with-icon">
          <LockKeyhole size={15} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            placeholder="Re-enter New Password"
            aria-label="Confirm Password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </span>
      </label>
      <div className="credentials-actions">
        <button type="submit" className="submit-credentials" disabled={isSubmitting}>
          {isSubmitting ? <div className="btn-spinner"></div> : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default function DetailsDrawer({ variant, onClose }) {
  const isCredentials = variant === 'credentials';
  const details = variant === 'asset' 
    ? assetDetails 
    : isCredentials 
      ? credentialsDetails 
      : variant === 'linux_identity'
        ? linuxIdentityDetails
        : identityDetails;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer-container details-drawer" onClick={(event) => event.stopPropagation()} aria-label="Details">
        <header className="details-drawer-header">
          <h2>Details</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close details"><X size={19} /></button>
        </header>
        <div className="details-drawer-body">
          <h3 className="details-section-title">General Details</h3>
          <DetailGrid items={details} />
          {isCredentials && <CredentialsForm onClose={onClose} />}
        </div>
      </aside>
    </div>
  );
}
