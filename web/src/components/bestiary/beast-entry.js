/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'gatsby';
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

// eslint-disable-next-line react/prop-types
const BeastEntry = ({ beastInfo }) => {
  const [openModal, updateOpenModal] = useState(false);

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
        // onClick={openBeastModal(beastInfo}
        onClick={() => updateOpenModal(true)}
      >
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
      <h2 className={styles.headline}>{name}</h2>
      <Modal
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        isOpen={openModal}
        style={customStyles}
        contentLabel="Example Modal"
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
                </>
              )}
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              className={styles.modalCloseButton}
              type="button"
              onClick={() => updateOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BeastEntry;
