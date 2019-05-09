import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import BlockText from '../block-text';

import styles from './beast-entry.module.css';

Modal.setAppElement('#___gatsby');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    background: 'var(--color-tbody-bg)',
    top: '25%',
    left: '25%',
    transform: 'translate(-15%, -11%)',
  },
};

const handleKeyPress = (e, setModal) => {
  switch (e.which) {
    case 13:
    case 32:
      setModal(true);
      break;
    default:
      break;
  }
};

const BeastEntry = ({ beastInfo }) => {
  const [openModal, setOpenModal] = useState(false);

  const {
    name,
    campaign,
    sessions,
    link,
    loot,
    mainImage,
    _rawDescription,
  } = beastInfo;

  return (
    <div className={styles.profileCard}>
      <div
        className={styles.profileMediaThumb}
        role="link"
        onClick={() => setOpenModal(true)}
        tabIndex={0}
        onKeyPress={e => handleKeyPress(e, setOpenModal)}
      >
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
      <Modal
        shouldCloseOnEsc
        isOpen={openModal}
        style={customStyles}
        contentLabel={`${name} Detail`}
        onRequestClose={() => setOpenModal(false)}
      >
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.beastFullSizeImage}>
              <Img fluid={mainImage.asset.fluid} />
            </div>
            <div className={styles.modalBeastInfo}>
              <div className={styles.modalHeader}>
                <h2>{name}</h2>
              </div>
              <div className={styles.info}>
                <BlockText blocks={_rawDescription} />
              </div>
              <div className={styles.label}>Campaign</div>
              <div className={styles.info}>
                <Link to={`/campaign/${campaign.slug.current}`}>
                  {campaign.title}
                </Link>
              </div>
              <div className={styles.label}>Sessions Encountered</div>
              <div className={styles.info}>
                <ul className={styles.sessions}>
                  {sessions.map(session => (
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
                  <table className={styles.loot}>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loot.map(lootItem => (
                        <tr key={lootItem._key}>
                          <th>{lootItem.itemName}</th>
                          <th>{lootItem.value || 'N/A'}</th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              className={styles.modalCloseButton}
              type="button"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

BeastEntry.propTypes = {
  beastInfo: PropTypes.shape({
    name: PropTypes.string,
    campaign: PropTypes.object,
    sessions: PropTypes.arrayOf(PropTypes.object),
    link: PropTypes.string,
    loot: PropTypes.arrayOf(PropTypes.object),
    mainImage: PropTypes.object,
    _rawDescription: PropTypes.array,
  }).isRequired,
};

export default BeastEntry;
