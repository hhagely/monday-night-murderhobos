import { Link } from 'gatsby';
import React from 'react';
import SessionPreview from './session-preview';

import styles from './session-preview-grid.module.css';

function SessionPreviewGrid(props) {
  return (
    <div className={styles.root}>
      {props.title && (
        <h2 className={styles.headline}>
          {props.browseMoreHref ? (
            <Link to={props.browseMoreHref}>{props.title}</Link>
          ) : (
            props.title
          )}
        </h2>
      )}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map((node) => (
            <li key={node.id}>
              <SessionPreview {...node} />
            </li>
          ))}
      </ul>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  );
}

SessionPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
};

export default SessionPreviewGrid;
