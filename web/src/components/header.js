import { Link } from 'gatsby';
import React from 'react';
import Icon from './icons';
import { cn } from '../lib/helpers';

import styles from './header.module.css';

// eslint-disable-next-line react/prop-types
const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <h1 className={styles.branding}>
        <Link to="/">{siteTitle}</Link>
      </h1>

      <button
        type="button"
        className={styles.toggleNavButton}
        onClick={showNav ? onHideNav : onShowNav}
      >
        <Icon symbol="hamburger" />
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/campaigns">Campaigns</Link>
          </li>
          <li>
            <Link to="/sessions/">Sessions</Link>
          </li>
          <li>
            <Link to="/party-treasury/">Party Treasury</Link>
          </li>
          {/* <li>
            <Link to="/graveyard/">Graveyard</Link>
          </li> */}
          <li>
            <Link to="/bestiary/">Bestiary</Link>
          </li>
          <li>
            <a
              target="_blank"
              href="https://mnmh.fandom.com/wiki/Monday_Night_MurderHobos_Wiki"
              rel="noopener noreferrer"
            >
              Wiki
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
