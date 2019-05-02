import React from 'react';
import BeastEntry from './beast-entry';

import styles from './bestiary-grid.module.css';

// eslint-disable-next-line react/prop-types
function BestiaryGrid({ items }) {
  return (
    <div className={styles.root}>
      <ul className={styles.grid}>
        {items.map(beast => (
          <li key={beast.id}>
            <BeastEntry beastInfo={beast} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestiaryGrid;
