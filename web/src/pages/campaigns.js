import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import CampaignPreviewGrid from '../components/campaign/campaign-preview-grid';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { mapEdgesToNodes } from '../lib/helpers';

import { responsiveTitle1 } from '../components/typography.module.css';

export const query = graphql`
  query CampaignsPageQuery {
    campaigns: allSanityCampaign(
      limit: 12
      # sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            asset {
              id
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
          title
          slug {
            current
          }
        }
      }
    }
  }
`;

const CampaignsPage = props => {
  // eslint-disable-next-line react/prop-types
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  const campaignNodes =
    data && data.campaigns && mapEdgesToNodes(data.campaigns);
  return (
    <Layout>
      <SEO title="Campaigns" />
      <Container>
        <h1 className={responsiveTitle1}>Campaigns</h1>
        {campaignNodes && campaignNodes.length > 0 && (
          <CampaignPreviewGrid nodes={campaignNodes} />
        )}
      </Container>
    </Layout>
  );
};

export default CampaignsPage;
