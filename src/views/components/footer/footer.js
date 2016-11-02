import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__link-container">
        <li className="footer__link">
          <Link to={'/'}>react-ssr-spa</Link>
        </li>
      </ul>
    </footer>
  );
}

