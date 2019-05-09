import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import GraveyardGrid from '../components/graveyard/graveyard-grid';

import { responsiveTitle1 } from '../components/typography.module.css';

export const query = graphql`
  query GraveyardPageQuery {
    graveyard: allSanityGraveyard {
      edges {
        node {
          id
          character {
            __typename
            ... on SanityPartyMember {
              character {
                characterName
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
                    _id
                  }
                }
              }
            }
            ... on SanityNpc {
              character {
                characterName
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
                    _id
                  }
                }
              }
            }
          }
          lastSession {
            title
            slug {
              current
            }
            _rawSlug
            campaign {
              title
              slug {
                current
              }
            }
          }
        }
      }
    }
  }
`;

const GraveyardPage = props => {
  // eslint-disable-next-line react/prop-types
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const graveyardNodes =
    data && data.graveyard && mapEdgesToNodes(data.graveyard);

  return (
    <Layout>
      <SEO title="Graveyard" />
      <Container>
        <h1 className={responsiveTitle1}>Graveyard</h1>
        {graveyardNodes && graveyardNodes.length > 0 && (
          <GraveyardGrid items={graveyardNodes} />
        )}
      </Container>
    </Layout>
  );
};

export default GraveyardPage;
