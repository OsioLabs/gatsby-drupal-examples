/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allNodeRecipe {
          edges {
            node {
              uuid,
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
          path_alias = `recipe/${node.uuid}`;
        } else {
          path_alias = node.path.alias;
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
            uuid: node.uuid,
          },
        })
      });

      resolve()
    })
  })
};
