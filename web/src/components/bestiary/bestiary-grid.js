import React from 'react';
import PropTypes from 'prop-types';
import BeastEntry from './beast-entry';

import styles from './bestiary-grid.module.css';

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

BestiaryGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BestiaryGrid;
