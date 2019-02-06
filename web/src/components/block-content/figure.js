import React from 'react';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';

import styles from './figure.module.css';

function Figure(props) {
  // eslint-disable-next-line react/prop-types
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

export default Figure;
