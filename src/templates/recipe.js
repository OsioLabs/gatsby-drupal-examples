import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Recipe from '../components/Recipe/Recipe';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const recipeTemplate = (props) => {
  const { classes } = props;
  const { nodeRecipe: recipe } = props.data;

  return (
    <Layout>
      <Helmet
        title={`Umami - ${recipe.title}`}
        meta={[
          {name: 'description', content: recipe.title},
        ]}
      />
      <Paper className={classes.root}>
        <Recipe
          {...recipe}
          category={recipe.relationships.category[0].name}
          tags={recipe.relationships.tags}
          instructions={recipe.instructions.processed}
          summary={recipe.summary.processed}
          image={recipe.relationships.image}
        />
      </Paper>
    </Layout>
  )
};

export default withStyles(styles)(recipeTemplate);

// The $drupal_id variable here is obtained from the "context" object passed into
// the createPage() API in gatsby-node.js.
//
// Also note the use of field name aliasing in the query. This is done to
// help normalize the shape of the recipe data.
export const query = graphql`
  query RecipeTemplate($drupal_id: String!) {
    nodeRecipe(drupal_id: {eq: $drupal_id}) {
      drupal_id,
      title,
      cooking_time: field_cooking_time,
      difficulty: field_difficulty,
      ingredients: field_ingredients,
      preparation_time: field_preparation_time,
      number_of_servings: field_number_of_servings,
      instructions: field_recipe_instruction {
        processed,
      },
      summary: field_summary {
        processed,
      },
      relationships {
        category: field_recipe_category {
          name,
        }
        tags: field_tags {
          name,
        }
        image: field_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
