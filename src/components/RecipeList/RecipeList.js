import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, Link, graphql } from "gatsby"

const RecipeListWrapper = () => (
  <StaticQuery
    query={graphql`
      query {
        allNodeRecipe(limit: 3) {
          edges {
            node {
              drupal_id,
              title,
              path {
                alias,
              }
            }
          }
        }
      }
    `}
    render={data => <RecipeList recipes={data.allNodeRecipe.edges} />}
  />
);

const RecipeList = ({recipes}) => (
  <ul>
    {
      recipes.map(({ node: recipe }) => (
        <li key={recipe.drupal_id}>
          <Link to={recipe.path.alias}>
            {recipe.title}
          </Link>
        </li>
      ))
    }
  </ul>
);

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        drupal_id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        path: PropTypes.shape({
          alias: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default RecipeListWrapper;
