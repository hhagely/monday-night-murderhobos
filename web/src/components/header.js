import { Link } from 'gatsby';
import React from 'react';
import Icon from './icons';
import { cn } from '../lib/helpers';

import styles from './header.module.css';

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <h1 className={styles.branding}>
        <Link to="/">{siteTitle}</Link>
      </h1>

      <button
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
          {/* <li>
            <Link to="/projects/">Projects</Link>
          </li> */}
          <li>
            <Link to="/campaigns">Campaigns</Link>
          </li>
          <li>
            <Link to="/sessions/">Sessions</Link>
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
          {/* <li>
            <Link to="/contact/">Contact</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
