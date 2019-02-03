const {
  api: { projectId, dataset }
} = require('../studio/sanity.json');

require('dotenv').config();

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId,
        dataset,
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Monday Night Murderhobos`,
        short_name: `MNMH`,
        start_url: `/`,
        background_color: `#e0e8f9`,
        theme_color: `#19216c`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`
        // icon: `src/images/icon.png`, // This path is relative to the root of the site.
        // include_favicon: true, // Include favicon
      }
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*.js': ['cache-control: public, max-age=31536000, immutable'],
          '/*.css': ['cache-control: public, max-age=31536000, immutable'],
          '/sw.js': ['cache-control: public, max-age=0, must-revalidate']
        }
      }
    },
    'gatsby-plugin-offline'
  ]
};
