import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import SessionPreviewGrid from '../components/session/session-preview-grid';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import CampaignPreviewGrid from '../components/campaign/campaign-preview-grid';
import SEO from '../components/seo';
import Layout from '../containers/layout';

const imgHeight = (9 / 16) * 600;

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
    }

    campaigns: allSanityCampaign(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            asset {
              id
              fluid(maxWidth: 600) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
          _rawExcerpt
          title
          slug {
            current
          }
        }
      }
    }

    sessions: allSanitySession(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } } }
    ) {
      edges {
        node {
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
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const sessionNodes = (data || {}).sessions
    ? mapEdgesToNodes(data.sessions)
    : [];
  const campaignNodes = (data || {}).campaigns
    ? mapEdgesToNodes(data.campaigns)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Company settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {campaignNodes && (
          <CampaignPreviewGrid
            title="Latest campaigns"
            nodes={campaignNodes}
            browseMoreHref="/campaigns/"
          />
        )}
        {sessionNodes && (
          <SessionPreviewGrid
            title="Latest sessions"
            nodes={sessionNodes}
            browseMoreHref="/sessions/"
          />
        )}
      </Container>
    </Layout>
  );
};

export default IndexPage;
