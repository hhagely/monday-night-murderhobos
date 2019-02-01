import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import SessionPreviewGrid from '../components/session/session-preview-grid';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';

import { responsiveTitle1 } from '../components/typography.module.css';

export const query = graphql`
  query SessionPageQuery {
    sessions: allSanitySession(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const SessionPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const sessionNodes = data && data.sessions && mapEdgesToNodes(data.sessions);

  return (
    <Layout>
      <SEO title="Sessions" />
      <Container>
        <h1 className={responsiveTitle1}>Sessions</h1>
        {sessionNodes && sessionNodes.length > 0 && (
          <SessionPreviewGrid nodes={sessionNodes} />
        )}
      </Container>
    </Layout>
  );
};

export default SessionPage;
