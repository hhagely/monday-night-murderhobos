import React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '../components/block-content';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import PartyMemberGrid from '../components/party-member-grid';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { mapEdgesToNodes } from '../lib/helpers';

import { responsiveTitle1 } from '../components/typography.module.css';

export const query = graphql`
  query AboutPageQuery {
    page: sanityPage(_id: { eq: "about" }) {
      title
      _rawBody
    }
    partyMembers: allSanityPartyMember(
      sort: { fields: [active], order: DESC }
    ) {
      edges {
        node {
          id
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
          class
          race
          active
          person {
            name
            id
          }
        }
      }
    }
  }
`;

const AboutPage = props => {
  // eslint-disable-next-line react/prop-types
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const page = data && data.page;
  const partyMemberNodes =
    data && data.partyMembers && mapEdgesToNodes(data.partyMembers);

  if (!page) {
    throw new Error(
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data'
    );
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <h1 className={responsiveTitle1}>{page.title}</h1>
        <BlockContent blocks={page._rawBody || []} />
        {partyMemberNodes && partyMemberNodes.length > 0 && (
          <PartyMemberGrid partyMembers={partyMemberNodes} />
        )}
      </Container>
    </Layout>
  );
};

export default AboutPage;
