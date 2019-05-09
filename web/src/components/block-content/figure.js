import React from 'react';
import PropTypes from 'prop-types';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';

import styles from './figure.module.css';

function Figure(props) {
  const { asset, alt, caption } = props;
  return (
    <figure className={styles.root}>
      {asset && (
        <img
          src={imageUrlFor(buildImageObj(props))
            .width(1200)
            .url()}
          alt={alt}
        />
      )}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

Figure.propTypes = {
  asset: PropTypes.object,
  alt: PropTypes.string,
  caption: PropTypes.string,
};

export default Figure;
