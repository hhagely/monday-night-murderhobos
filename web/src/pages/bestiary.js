import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import BestiaryGrid from '../components/bestiary/bestiary-grid';

import { responsiveTitle1 } from '../components/typography.module.css';

export const query = graphql`
  query BestiaryPageQuery {
    bestiary: allSanityBestiary {
      edges {
        node {
          id
          name
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
              # fixed(width: 197) {
              #   ...GatsbySanityImageFixed
              # }
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
            link
            value
          }
        }
      }
    }
  }
`;

const BestiaryPage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const bestiaryNodes = data && data.bestiary && mapEdgesToNodes(data.bestiary);

  return (
    <Layout>
      <SEO title="Bestiary" />
      <Container>
        <h1 className={responsiveTitle1}>Bestiary</h1>
        {bestiaryNodes && bestiaryNodes.length > 0 && (
          <BestiaryGrid items={bestiaryNodes} />
        )}
      </Container>
    </Layout>
  );
};

export default BestiaryPage;
