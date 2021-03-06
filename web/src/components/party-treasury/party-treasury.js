import React from 'react';
import PropTypes from 'prop-types';

import styles from './party-treasury.module.css';

function PartyTreasury({ items }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.treasuryTable}>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Value</th>
            <th>Belongs To</th>
            <th>Player</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            const { id, owner } = item;
            const { itemName, link, value } = item.item;
            const { character, race, person } = owner;

            return (
              <tr key={id}>
                <th>
                  <div className={styles.charInfo}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {itemName}
                    </a>
                  </div>
                </th>
                <th>
                  <div className={styles.charInfo}>{value}</div>
                </th>
                <th>
                  <div className={styles.charInfo}>{`${
                    character.characterName
                  }`}</div>
                  <div className={styles.charSubInfo}>{`${race} ${
                    owner.class
                  }`}</div>
                </th>
                <th>
                  <div className={styles.charInfo}>{person.name}</div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

PartyTreasury.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PartyTreasury;
