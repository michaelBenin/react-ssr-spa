import React from 'react';
import { Link } from 'react-router';

export default function () {
  return (
    <div className="index-page">
      <h1>Welcome to react-ssr-spa working demo.</h1>
      <Link to={'/repo/michaelBenin/react-ssr-spa'}>react-ssr-spa</Link>
    </div>
  );
}
