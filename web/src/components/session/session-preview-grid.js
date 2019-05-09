import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import SessionPreview from './session-preview';

import styles from './session-preview-grid.module.css';

function SessionPreviewGrid({ title, browseMoreHref, nodes }) {
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
              <SessionPreview {...node} />
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

SessionPreviewGrid.propTypes = {
  title: PropTypes.string,
  browseMoreHref: PropTypes.string,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SessionPreviewGrid;
