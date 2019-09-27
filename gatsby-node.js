/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
const fs = require('fs');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // Example of hard-coding a redirect.
  createRedirect({
    fromPath: 'old-url',
    toPath: 'new/better-url',
    isPermanent: true,
  });

  // Load any information about redirects.
  // This data is used when creating pages below to check for changes in the
  // Drupal generated path to a page and then calls createRedirect().
  // Note that calls to createRedirect() don't do anything by default other than
  // make the data available to plugins. You'll need a plugin like
  // https://www.gatsbyjs.org/packages/gatsby-plugin-netlify/ to actually setup
  // redirects to happen.
  const redirects = await graphql(`
    {
      allRedirectRedirect {
        edges {
          node {
            redirect_source {
              path
            }
            redirect_redirect {
              uri
            }
          }
        }
      }
    }
  `).then(result => {
    // Create pages for collections sourced from Drupal.
    const data = [];
    if (!result.errors) {
      result.data.allRedirectRedirect.edges.forEach(({ node }) => {
        // Redirect paths will take one of two forms depending on how they were
        // created in Drupal. entity:node/42 or internal:/node/42, this
        // normalizes them both to /node/42.
        data[node.redirect_redirect.uri.replace(/^entity:|internal:\//, '/')] = node;
      });
    }

    return data;
  });

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allNodeRecipe {
          edges {
            node {
              drupal_id,
              drupal_internal__nid,
              title,
              path {
                alias,
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allNodeRecipe.edges.forEach(({ node }) => {
        let path_alias;
        if (node.path.alias == null) {
          path_alias = `recipe/${node.drupal_id}`;
        } else {
          path_alias = node.path.alias;
        }

        // Handle generating redirects as needed.
        if (redirects[`/node/${node.drupal_internal__nid}`]) {
          createRedirect({
            fromPath: redirects[`/node/${node.drupal_internal__nid}`].redirect_source.path,
            toPath: path_alias,
            isPermanent: true,
            redirectInBrowser: true,
          });
        }

        createPage({
          // This is the path, or route, at which the page will be visible.
          path: path_alias,
					// This the path to the file that contains the React component
					// that will be used to render the HTML for the recipe.
          component: path.resolve(`./src/templates/recipe.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL
            // variables.
            drupal_id: node.drupal_id,
          },
        })
      });

      resolve()
    })
  })
};

/**
 * Helper function to handle writing an array of redirects to a .json file.
 */
function writeRedirectsFile(redirects, folder, pathPrefix) {
  if (!redirects.length) return;
  let redirectList = [];

  for (const redirect of redirects) {
    const { fromPath, toPath } = redirect;
    redirectList.push({
      from: `${pathPrefix}/${fromPath}`,
      to: `${pathPrefix}/${toPath}`
    });
  }

  fs.writeFileSync(`${folder}/redirects.json`, JSON.stringify(redirectList));
}

// Implements Gatsby's onPostBuild Node API. Note, this ONLY runs during
// gatsby build, not during gatsby develop. This code demonstrates how a plugin
// or custom code could make use of redirects registered via the createRedirect
// action to provide server configuration for redirecting URLs.
exports.onPostBuild = ({ store }) => {
  const { redirects, program, config } = store.getState();

  // Determine if the current application has a path prefix configured via
  // gatsby-config.js or other.
  let pathPrefix = '';
  if (program.prefixPaths) {
    pathPrefix = config.pathPrefix;
  }

  // Figure out where the /public directory is.
  const folder = path.join(program.directory, 'public');

  return writeRedirectsFile(redirects, folder, pathPrefix);
};
