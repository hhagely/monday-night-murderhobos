import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import BestiaryGrid from '../components/graveyard/graveyard-grid';

import { responsiveTitle1 } from '../components/typography.module.css';

export const query = graphql`
  query GraveyardPageQuery {
    graveyard: allSanityGraveyard {
      edges {
        node {
          id
          # character {
          #   characterName
          #   mainImage {
          #     alt
          #     asset {
          #       _id
          #     }
          #   }
          # }
          lastSession {
            title
            _rawSlug
            campaign {
              title
              _rawSlug
            }
          }
        }
      }
    }
  }
`;

const GraveyardPage = (props) => {
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
          <BestiaryGrid items={graveyardNodes} />
        )}
      </Container>
    </Layout>
  );
};

export default GraveyardPage;
