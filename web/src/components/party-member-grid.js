import React from 'react';
import PropTypes from 'prop-types';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';

import styles from './party-member-grid.module.css';
import { responsiveTitle2 } from './typography.module.css';

function ProfileCard(partyMemberInfo) {
  const { characterName, race, person } = partyMemberInfo;
  const { mainImage } = partyMemberInfo.character;
  const characterClass = partyMemberInfo.class;

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileMediaThumb}>
        {mainImage && mainImage.asset && (
          <img
            alt={mainImage.alt}
            src={imageUrlFor(buildImageObj(mainImage))
              .width(600)
              .height(600)
              .fit('scale')
              .url()}
          />
        )}
      </div>
      <h2 className={styles.headline}>{characterName}</h2>
      <div className={styles.characterLabel}>Race/Class</div>
      <div className={styles.characterInfo}>
        {race} {characterClass}
      </div>
      <div className={styles.characterLabel}>Player</div>
      <div className={styles.characterInfo}>{person.name}</div>
    </div>
  );
}

function PartyMemberGrid({ partyMembers }) {
  return (
    <div className={styles.root}>
      {<h2 className={responsiveTitle2}>Party Members</h2>}
      <ul className={styles.grid}>
        {partyMembers.map(partyMember => (
          <li key={partyMember.id}>
            <ProfileCard {...partyMember} />
          </li>
        ))}
      </ul>
    </div>
  );
}

PartyMemberGrid.propTypes = {
  partyMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PartyMemberGrid;
