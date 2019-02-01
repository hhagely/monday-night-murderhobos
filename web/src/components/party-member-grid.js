import React from 'react';
import BlockText from './block-text';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';

import styles from './party-member-grid.module.css';
import { responsiveTitle2 } from '../components/typography.module.css';

function ProfileCard(partyMemberInfo) {
  const { characterName, race, person } = partyMemberInfo;
  const { image } = person;
  const characterClass = partyMemberInfo.class;
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileMediaThumb}>
        {image && image.asset && (
          <img
            src={imageUrlFor(buildImageObj(image))
              .width(600)
              .height(600)
              .fit('crop')
              .url()}
          />
        )}
      </div>
      {/* <div className={styles.characterInfo}>Character</div> */}
      <h2 className={styles.headline}>{characterName}</h2>
      <p>
        <div className={styles.characterLabel}>Race/Class</div>
        <div className={styles.characterInfo}>
          {race} {characterClass}
        </div>
      </p>
      {/* <div>{characterClass}</div> */}
      <p>
        <div className={styles.characterLabel}>Player</div>
        <div className={styles.characterInfo}>{person.name}</div>
      </p>
      {/* {_rawBio && (
        <div className={styles.bio}>
          <BlockText blocks={_rawBio} />
        </div>
      )} */}
    </div>
  );
}

function PartyMemberGrid({ partyMembers }) {
  console.log('about page props: ', partyMembers);
  const { characterName, race, person } = partyMembers;
  const characterClass = partyMembers.class;
  console.log('class: ', characterClass);

  return (
    // <div>this is text</div>
    <div className={styles.root}>
      {<h2 className={responsiveTitle2}>Party Members</h2>}
      <ul className={styles.grid}>
        {partyMembers.map((partyMember) => (
          <li key={partyMember.id}>
            <ProfileCard {...partyMember} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PartyMemberGrid;
