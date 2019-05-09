// const { format } = require('date-fns');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createCampaignPages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions;
  const result = await graphql(`
    {
      allSanityCampaign(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const campaignEdges = (result.data.allSanityCampaign || {}).edges || [];

  campaignEdges.forEach(edge => {
    const { id } = edge.node;
    const slug = edge.node.slug.current;
    const path = `/campaign/${slug}/`;

    reporter.info(`Creating campaign page: ${path}`);

    createPage({
      path,
      component: require.resolve('./src/templates/campaign.js'),
      context: { id },
    });

    createPageDependency({ path, nodeId: id });
  });
}

async function createSessionPages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions;
  const result = await graphql(`
    {
      allSanitySession(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.error) throw result.errors;

  const sessionEdges = (result.data.allSanitySession || {}).edges || [];

  sessionEdges.forEach(edge => {
    const { id } = edge.node;
    const slug = edge.node.slug.current;
    const path = `/session/${slug}/`;

    reporter.info(`Creating session page: ${path}`);

    createPage({
      path,
      component: require.resolve('./src/templates/session.js'),
      context: { id },
    });

    createPageDependency({ path, nodeId: id });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createCampaignPages(graphql, actions, reporter);
  await createSessionPages(graphql, actions, reporter);
};
