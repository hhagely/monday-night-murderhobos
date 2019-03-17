/* eslint-disable react/prop-types */
import { format, distanceInWords, differenceInDays } from 'date-fns';
import React from 'react';
import { Link } from 'gatsby';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import BlockContent from '../block-content';
import Container from '../container';

import styles from './campaign.module.css';

function Campaign(props) {
  const {
    _rawBody,
    title,
    categories,
    mainImage,
    publishedAt,
    sessionNodes,
  } = props;
  return (
    <article className={styles.root}>
      {mainImage && mainImage.asset && (
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
                  {sessionNodes.map(
                    (session) =>
                      // if (session.slug && session.slug.current) {
                      session.slug &&
                      session.slug.current && (
                        <li key={`session_${session._id}`}>
                          <Link to={`/session/${session.slug.current}`}>
                            {session.title}
                          </Link>
                        </li>
                      )
                    // }
                  )}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}

export default Campaign;
