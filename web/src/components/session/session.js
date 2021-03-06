import { format, distanceInWords, differenceInDays } from 'date-fns';
import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import BlockContent from '../block-content';
import Container from '../container';
import RoleList from '../role-list';

import styles from './session.module.css';

function Session(props) {
  const { _rawBody, authors, campaign, title, mainImage, publishedAt } = props;
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
            {_rawBody && <BlockContent blocks={_rawBody} />}
          </div>
          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do YYYY')}
              </div>
            )}
            {authors && <RoleList items={authors} title="Authors" />}
            {campaign && (
              <div className={styles.campaign}>
                <h3 className={styles.campaignHeadline}>Campaign</h3>
                <ul>
                  <li>
                    <Link to={`/campaign/${campaign.slug.current}`}>
                      {campaign.title}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}
// const { _rawBody, authors, campaign, title, mainImage, publishedAt } = props;

Session.propTypes = {
  _rawBody: PropTypes.array,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  campaign: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  mainImage: PropTypes.object.isRequired,
  publishedAt: PropTypes.string.isRequired,
};

export default Session;
