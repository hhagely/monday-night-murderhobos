import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import CampaignPreview from './campaign-preview';

import styles from './campaign-preview-grid.module.css';

function CampaignPreviewGrid({ title, browseMoreHref, nodes }) {
  return (
    <div className={styles.root}>
      {title && (
        <h2 className={styles.headline}>
          {browseMoreHref ? <Link to={browseMoreHref}>{title}</Link> : title}
        </h2>
      )}
      <ul className={styles.grid}>
        {nodes &&
          nodes.map(node => (
            <li key={node.id}>
              <CampaignPreview {...node} />
            </li>
          ))}
      </ul>
      {browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  );
}

CampaignPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

CampaignPreviewGrid.propTypes = {
  title: PropTypes.string,
  browseMoreHref: PropTypes.string,
  nodes: PropTypes.arrayOf(PropTypes.object),
};

export default CampaignPreviewGrid;
