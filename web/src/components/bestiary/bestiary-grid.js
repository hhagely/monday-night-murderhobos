import React from 'react';
import { Link } from 'gatsby';
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
                {/* <ul className={styles.loot}> */}
                {loot.map((lootItem) => (
                  <tr key={lootItem._key}>
                    <th>{lootItem.itemName}</th>
                    <th>{lootItem.value || 'N/A'}</th>

                    {/* {lootItem.itemName} */}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* </ul> */}
          </div>
        </>
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
