import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div className="index-page">
      <h1>Welcome to react-ssr-spa working demo.</h1>
      <Link to={'/repo/michaelBenin/react-ssr-spa'}>demo: react-ssr-spa</Link>
    </div>
  );
}
