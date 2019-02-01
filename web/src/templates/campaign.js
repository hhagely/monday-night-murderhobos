import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import Campaign from '../components/campaign/campaign';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { mapEdgesToNodes } from '../lib/helpers';

export const query = graphql`
  query CampaignTemplateQuery($id: String!) {
    campaign: sanityCampaign(id: { eq: $id }) {
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
          fluid(maxWidth: 700) {
            ...GatsbySanityImageFluid
          }
        }
      }
      title
      slug {
        current
      }
      _rawBody
    }

    sessions: allSanitySession(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { campaign: { id: { eq: $id } } }
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

const CampaignTemplate = (props) => {
  const { data, errors } = props;
  const campaign = data && data.campaign;
  // const sessions = data && data.sessions;
  const sessionNodes = (data || {}).sessions
    ? mapEdgesToNodes(data.sessions)
    : [];

  const allprops = { ...campaign, sessionNodes };

  console.log('campaign template data: ', data);
  console.log('campaign sessions: ', sessionNodes);
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {campaign && <SEO title={campaign.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {campaign && sessionNodes && <Campaign {...allprops} />}
    </Layout>
  );
};

export default CampaignTemplate;
