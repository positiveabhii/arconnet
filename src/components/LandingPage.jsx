'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

const coverSlide = '/ARCON branding cover slide.png';

export default function LandingPage() {
  return (
    <div className="landing-page-wrapper">
      <img src={coverSlide} alt="ARCON — Guarding every identity that touches the enterprise" className="landing-cover" />

      <a href="/login" className="landing-cta">
        Sign In
        <ArrowRight size={16} />
      </a>
    </div>
  );
}
