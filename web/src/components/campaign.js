import { format, distanceInWords, differenceInDays } from 'date-fns';
import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import BlockContent from './block-content';
import Container from './container';
import RoleList from './role-list';

import styles from './campaign.module.css';

function Campaign(props) {
  const { _rawBody, title, categories, mainImage, publishedAt } = props;
  console.log(props);
  return (
    <article className={styles.root}>
      {props.mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <Img fixed={mainImage.asset.fixed} />
          {/* <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .url()}
            alt={mainImage.alt}
          /> */}
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
