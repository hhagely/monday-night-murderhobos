import React from 'react';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';

import styles from './bestiary-grid.module.css';
import { responsiveTitle2 } from '../typography.module.css';

function ProfileCard(beastInfo) {
  const {
    name,
    campaign,
    sessions,
    // description,
    link,
    loot,
    mainImage,
  } = beastInfo;

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileMediaThumb}>
        {mainImage && mainImage.asset && (
          <img
            alt={mainImage.alt}
            src={imageUrlFor(buildImageObj(mainImage))
              .width(600)
              .height(600)
              .fit('crop')
              .url()}
          />
        )}
      </div>
      <h2 className={styles.headline}>{name}</h2>
      <div className={styles.label}>Campaign</div>
      <div className={styles.info}>{campaign.title}</div>
      <div className={styles.label}>Sessions Encountered</div>
      <div className={styles.info}>
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>{session.title}</li>
          ))}
        </ul>
      </div>
      {link && (
        <>
          <div className={styles.label}>Wiki Link</div>
          <div className={styles.info}>{link}</div>
        </>
      )}
      {loot && loot.length > 0 && (
        <ul>
          {loot.map((lootItem) => (
            <li key={lootItem._key}>{lootItem.itemName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function BestiaryGrid({ items }) {
  return (
    <div className={styles.root}>
      {/* {<h2 className={responsiveTitle2}>Party Members</h2>} */}
      <ul className={styles.grid}>
        {items.map((beast) => (
          <li key={beast.id}>
            <ProfileCard {...beast} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestiaryGrid;
