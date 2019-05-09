import React, { useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { mapEdgesToNodes } from '../lib/helpers';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import BestiaryGrid from '../components/bestiary/bestiary-grid';

import styles from './bestiary.module.css';
import { responsiveTitle1 } from '../components/typography.module.css';

export const query = graphql`
  query BestiaryPageQuery {
    tags: allSanityBestiaryTag {
      edges {
        node {
          id
          tagName
        }
      }
    }
    bestiary: allSanityBestiary(sort: { fields: [name], order: ASC }) {
      edges {
        node {
          id
          name
          tags {
            id
            tagName
          }
          _rawDescription
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            alt
            asset {
              fluid(maxWidth: 600) {
                ...GatsbySanityImageFluid
              }
              _id
            }
          }
          link
          campaign {
            id
            title
            slug {
              current
            }
          }
          sessions {
            id
            title
            slug {
              current
            }
          }
          loot {
            _key
            itemName
            value
          }
        }
      }
    }
  }
`;

function filterBestiaryByTag(bestiary, tags) {
  if (tags.length === 0) return bestiary;

  // eslint-disable-next-line array-callback-return
  const beasts = bestiary.filter(beast => {
    if (beast.tags) {
      const beastTags = beast.tags.map(tag => tag.tagName);
      if (tags.every(t => beastTags.includes(t))) return beast;
    }
  });

  return beasts;
}

function updateTags(selectedTags, newTag) {
  const tagsCopy = Array.from(selectedTags);

  // ? Remove if it's already in the list, add it otherwise.
  return tagsCopy.includes(newTag)
    ? tagsCopy.filter(tag => tag !== newTag)
    : [...tagsCopy, newTag];
}

const BestiaryPage = props => {
  const { data, errors } = props;

  const bestiaryNodes = data && data.bestiary && mapEdgesToNodes(data.bestiary);
  const bestiaryTagNodes = data && data.tags && mapEdgesToNodes(data.tags);

  const [bestiary, setBestiary] = useState(bestiaryNodes);
  const [selectedTags, setSelectedTags] = useState([]);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="Bestiary" />
      <Container>
        <h1 className={responsiveTitle1}>Bestiary</h1>
        {bestiaryTagNodes && bestiaryTagNodes.length > 0 && (
          <ul className={styles.tagGrid}>
            {bestiaryTagNodes.map(tag => (
              <li key={tag.id}>
                <button
                  type="button"
                  className={
                    selectedTags.includes(tag.tagName)
                      ? styles.bestiaryTagButtonSelected
                      : styles.bestiaryTagButton
                  }
                  onClick={() => {
                    const newTags = updateTags(selectedTags, tag.tagName);
                    setSelectedTags(newTags);
                    setBestiary(filterBestiaryByTag(bestiaryNodes, newTags));
                  }}
                >
                  {tag.tagName}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                className={styles.bestiaryTagButton}
                onClick={() => {
                  setSelectedTags([]);
                  setBestiary(filterBestiaryByTag(bestiaryNodes, []));
                }}
              >
                Clear Tags
              </button>
            </li>
          </ul>
        )}
        {bestiary && bestiary.length > 0 && <BestiaryGrid items={bestiary} />}
      </Container>
    </Layout>
  );
};

BestiaryPage.propTypes = {
  data: PropTypes.shape({
    tags: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            tagName: PropTypes.string.isRequired,
          }),
        })
      ),
    }),
    bestiary: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            tags: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.string,
                tagName: PropTypes.string,
              })
            ),
            _rawDescription: PropTypes.array,
            mainImage: PropTypes.shape({
              crop: PropTypes.shape({
                _key: PropTypes.string,
                _type: PropTypes.string,
                top: PropTypes.number,
                bottom: PropTypes.number,
                left: PropTypes.number,
                right: PropTypes.number,
              }),
              hotspot: PropTypes.shape({
                _key: PropTypes.string,
                _type: PropTypes.string,
                x: PropTypes.number,
                y: PropTypes.number,
                height: PropTypes.number,
                width: PropTypes.number,
              }),
              alt: PropTypes.string,
              asset: PropTypes.object,
            }),
            link: PropTypes.string,
            campaign: PropTypes.shape({
              id: PropTypes.string,
              title: PropTypes.string,
              slug: PropTypes.shape({
                current: PropTypes.string,
              }),
            }),
            sessions: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.string,
                title: PropTypes.string,
                slug: PropTypes.shape({
                  current: PropTypes.string,
                }),
              })
            ),
            loot: PropTypes.arrayOf(
              PropTypes.shape({
                _key: PropTypes.string,
                itemName: PropTypes.string,
                value: PropTypes.string,
              })
            ),
          }),
        })
      ),
    }),
  }),
  errors: PropTypes.array,
};

export default BestiaryPage;
