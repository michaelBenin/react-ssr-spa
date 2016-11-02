import React from 'react';
import { Link } from 'react-router';

export default function () {
  return (
    <div className="about-page">
      <h1>{'What\'s this about?'}</h1>
      <Link to={'/repo/michaelBenin/react-ssr-spa'}>react-ssr-spa</Link>
    </div>
  );
}
