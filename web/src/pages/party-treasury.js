import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import PartyTreasury from '../components/party-treasury/party-treasury';

import { responsiveTitle1 } from '../components/typography.module.css';

export const query = graphql`
  query PartyTreasuryPageQuery {
    treasuryItems: allSanityPartyTreasury {
      edges {
        node {
          id
          item {
            itemName
            link
            value
          }
          owner {
            character {
              characterName
            }
            race
            class
            person {
              name
            }
          }
        }
      }
    }
  }
`;

const PartyTreasuryPage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const treasuryNodes =
    data && data.treasuryItems && mapEdgesToNodes(data.treasuryItems);

  return (
    <Layout>
      <SEO title="Party Treasury" />
      <Container>
        <h1 className={responsiveTitle1}>Party Treasury</h1>
        {treasuryNodes && treasuryNodes.length > 0 && (
          <PartyTreasury items={treasuryNodes} />
        )}
      </Container>
    </Layout>
  );
};

export default PartyTreasuryPage;
