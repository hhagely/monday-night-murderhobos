import { format, distanceInWords, differenceInDays } from 'date-fns';
import React from 'react';
import { Link } from 'gatsby';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import BlockContent from '../block-content';
import Container from '../container';
import SessionPreviewGrid from '../session/session-preview-grid';

import styles from './campaign.module.css';

function Campaign(props) {
  const {
    _rawBody,
    title,
    categories,
    mainImage,
    publishedAt,
    sessionNodes
  } = props;
  console.log('campaign props: ', props);
  return (
    <article className={styles.root}>
      {props.mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
          </div>
          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do YYYY')}
              </div>
            )}
            {/* {members && <RoleList items={members} title="Authors" />} */}
            {categories && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Categories</h3>
                <ul>
                  {categories.map((category) => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
            {sessionNodes && (
              <div className={styles.sessions}>
                <h3 className={styles.sessionsHeadline}>Sessions</h3>
                <ul>
                  {sessionNodes.map((session) => (
                    <li key={`session_${session._id}`}>
                      <Link to={`/session/${session.slug.current}`}>
                        {session.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* {sessionNodes && (
              <SessionPreviewGrid
                title="Latest sessions"
                nodes={sessionNodes}
                browseMoreHref="/sessions/"
              />
            )} */}
            {/* {relatedProjects && (
              <div className={styles.relatedProjects}>
                <h3 className={styles.relatedProjectsHeadline}>
                  Related projects
                </h3>
                <ul>
                  {relatedProjects.map((project) => (
                    <li key={`related_${project._id}`}>
                      <Link to={`/campaign/${project.slug.current}`}>
                        {project.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </aside>
        </div>
      </Container>
    </article>
  );
}

export default Campaign;
