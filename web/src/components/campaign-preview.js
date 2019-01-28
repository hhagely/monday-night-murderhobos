import { Link } from 'gatsby';
import React from 'react';
import { cn } from '../lib/helpers';
import BlockText from './block-text';
import Img from 'gatsby-image';

import styles from './campaign-preview.module.css';
import { responsiveTitle3 } from './typography.module.css';

function CampaignPreview(props) {
  console.log('campaign preview props: ', props);
  return (
    <Link className={styles.root} to={`/campaign/${props.slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <Img fluid={props.mainImage.asset.fluid} alt={props.mainImage.alt} />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
    </Link>
  );
}

export default CampaignPreview;
