import { Link } from 'gatsby';
import React from 'react';
import ProjectPreview from './project-preview';

import styles from './project-preview-grid.module.css';

// eslint-disable-next-line react/prop-types
function ProjectPreviewGrid({ title, browseMoreHref, nodes }) {
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
              <ProjectPreview {...node} />
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

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

export default ProjectPreviewGrid;
