import React from 'react';
import { Link } from 'gatsby';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';

import styles from './graveyard-grid.module.css';

function ProfileCard(characterInfo) {
  console.log('char: ', characterInfo);
  const { name, campaign, sessions, link, loot, mainImage } = characterInfo;
  // console.log('campaign: ', campaign);
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
      {campaign && campaign.slug && (
        
      )}
      <div className={styles.label}>Campaign</div>
      <div className={styles.info}>
        <Link to={`/campaign/${campaign.slug.current}`}>{campaign.title}</Link>
      </div>
      <div className={styles.label}>Sessions Encountered</div>
      <div className={styles.info}>
        <ul className={styles.sessions}>
          {sessions.map((session) => (
            <li key={session.id}>
              <Link to={`/session/${session.slug.current}`}>
                {session.title}
              </Link>
            </li>
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
        <>
          <div className={styles.label}>Loot</div>
          <div className={styles.info}>
            <table className={styles.loot}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {loot.map((lootItem) => (
                  <tr key={lootItem._key}>
                    <th>{lootItem.itemName}</th>
                    <th>{lootItem.value || 'N/A'}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function GraveyardGrid({ items }) {
  return (
    <div className={styles.root}>
      <ul className={styles.grid}>
        {items.map((character) => (
          <li key={character.id}>
            <ProfileCard {...character} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GraveyardGrid;
