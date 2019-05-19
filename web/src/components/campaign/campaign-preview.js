import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { cn } from '../../lib/helpers';
import BlockText from '../block-text';

import styles from './campaign-preview.module.css';
import { responsiveTitle3 } from '../typography.module.css';

function CampaignPreview({ slug, mainImage, title, _rawExcerpt }) {
  return (
    <Link className={styles.root} to={`/campaign/${slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {mainImage && mainImage.asset && <Img fluid={mainImage.asset.fluid} alt={mainImage.alt} />}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{title}</h3>
      {_rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={_rawExcerpt} />
        </div>
      )}
    </Link>
  );
}

CampaignPreview.propTypes = {
  slug: PropTypes.object,
  mainImage: PropTypes.object,
  title: PropTypes.string,
  _rawExcerpt: PropTypes.string,
};

export default CampaignPreview;
