import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import Session from '../components/session/session';
import SEO from '../components/seo';
import Layout from '../containers/layout';

export const query = graphql`
  query SessionTemplateQuery($id: String!) {
    session: sanitySession(id: { eq: $id }) {
      id
      publishedAt
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
        asset {
          _id
        }
        alt
      }
      title
      slug {
        current
      }
      _rawBody
      authors {
        _key
        person {
          image {
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
            asset {
              _id
            }
          }
          name
        }
        roles
      }
    }
  }
`;

const SessionTemplate = (props) => {
  // eslint-disable-next-line react/prop-types
  const { data, errors } = props;
  const session = data && data.session;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {session && <SEO title={session.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {session && <Session {...session} />}
    </Layout>
  );
};

export default SessionTemplate;
