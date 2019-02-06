import { Link } from 'gatsby';
import React from 'react';
import SessionPreview from './session-preview';

import styles from './session-preview-grid.module.css';

// eslint-disable-next-line react/prop-types
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
          nodes.map((node) => (
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

SessionPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

export default SessionPreviewGrid;
