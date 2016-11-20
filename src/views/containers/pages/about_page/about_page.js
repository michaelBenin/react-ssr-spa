import React from 'react';
import { Link } from 'react-router';

export default function () {
  return (
    <div className="about-page">
      <h1>{'What\'s this about?'}</h1>
      <p>
        This project aims to do one thing well: make server side rendering simple
        in a react application using only mature community maintained libraries.
      </p>
      <Link to={'/repo/michaelBenin/react-ssr-spa'}>react-ssr-spa</Link>
    </div>
  );
}
