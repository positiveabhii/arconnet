'use client';

import React from 'react';
import SessionLogViewPage from '../../../../src/components/SessionLogViewPage';

export default function Page() {
  return <SessionLogViewPage onBack={() => window.history.back()} />;
}
