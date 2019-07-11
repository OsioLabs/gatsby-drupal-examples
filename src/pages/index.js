import React from 'react'
import PropTypes from 'prop-types';
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/layout'
import RecipeCard from '../components/RecipeCard/RecipeCard';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const IndexPage = (props) => {
  const classes = useStyles();

  return (
    <Layout>
      <Paper className={classes.root}>
        <Typography variant="h2">Hi people</Typography>
        <Typography variant="subtitle1" paragraph>
          Welcome to your new Gatsby site using <a href="https://material-ui.com">Material UI</a> for the UI.
        </Typography>
        <Typography variant="subtitle1" paragraph>
          Now go build something great.
        </Typography>
      </Paper>
      <Box mt={3}>
        <Grid container spacing={1}>
        {
          props.data.allNodeRecipe.edges.map(({ node: recipe }) => (
            <Grid item key={recipe.title} xs={6} md={4}>
              <RecipeCard
                title={recipe.title}
                summary={recipe.summary.processed}
                category={recipe.relationships.category[0].name}
                path={recipe.path.alias}
                image={recipe.relationships.image}
              />
            </Grid>
          ))
        }
        </Grid>
      </Box>
    </Layout>
  );
};

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default IndexPage;

// The result of this GraphQL query will be injected as props.data into the
// IndexPage component.
export const query = graphql`
  query {
    allNodeRecipe(sort: {fields: [changed], order:DESC}) {
      edges {
        node {
          drupal_id,
          title,
          path {
            alias,
          }
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
    }
  }
`;
