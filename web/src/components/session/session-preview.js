import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import { buildImageObj, cn, getSessionUrl } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import BlockText from '../block-text';

import styles from './session-preview.module.css';
import { responsiveTitle3 } from '../typography.module.css';

function SessionPreview({ publishedAt, mainImage, slug, title, _rawExcerpt }) {
  return (
    <>
      <Link
        className={styles.root}
        to={getSessionUrl(publishedAt, slug.current)}
      >
        <div className={styles.leadMediaThumb}>
          {mainImage && mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(mainImage))
                .width(600)
                .height(Math.floor((9 / 16) * 600))
                .url()}
              alt={mainImage.alt}
            />
          )}
        </div>
        <h3 className={cn(responsiveTitle3, styles.title)}>{title}</h3>
      </Link>
      {_rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={_rawExcerpt} />
        </div>
      )}
    </>
  );
}

SessionPreview.propTypes = {
  publishedAt: PropTypes.string.isRequired,
  mainImage: PropTypes.object,
  slug: PropTypes.object.isRequired,
  title: PropTypes.string,
  _rawExcerpt: PropTypes.array,
};

export default SessionPreview;
