import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import Campaign from '../components/campaign';
import SEO from '../components/seo';
import Layout from '../containers/layout';

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
          # fixed(width: 700) {
          #   ...GatsbySanityImageFixed
          # }
        }
      }
      title
      slug {
        current
      }
      _rawBody
    }
  }
`;

const CampaignTemplate = (props) => {
  const { data, errors } = props;
  const campaign = data && data.campaign;

  console.log('campaign template data: ', data);
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {campaign && <SEO title={campaign.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {campaign && <Campaign {...campaign} />}
    </Layout>
  );
};

export default CampaignTemplate;
