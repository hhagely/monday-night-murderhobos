import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';

import styles from './graveyard-grid.module.css';

function ProfileCard(characterInfo) {
  const { character, lastSession } = characterInfo;
  const { characterName, mainImage } = character.character;
  const { campaign } = lastSession;

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
      <h2 className={styles.headline}>
        {`${characterName} ${
          character.__typename === 'SanityNpc' ? '(NPC)' : '(Party Member)'
        }`}
      </h2>
      <div className={styles.label}>Campaign</div>
      <div className={styles.info}>
        <Link to={`/campaign/${campaign.slug.current}`}>{campaign.title}</Link>
      </div>
      <div className={styles.label}>Last Session</div>
      <div className={styles.info}>
        <ul className={styles.sessions}>
          <li>
            <Link to={`/session/${lastSession.slug.current}`}>
              {lastSession.title}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function GraveyardGrid({ items }) {
  return (
    <div className={styles.root}>
      <ul className={styles.grid}>
        {items.map(character => (
          <li key={character.id}>
            <ProfileCard {...character} />
          </li>
        ))}
      </ul>
    </div>
  );
}

GraveyardGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      character: PropTypes.object,
      lastSession: PropTypes.object,
    })
  ),
};

export default GraveyardGrid;
