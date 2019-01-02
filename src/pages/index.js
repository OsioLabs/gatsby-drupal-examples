import React from 'react'
import PropTypes from 'prop-types';
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import RecipeCard from '../components/RecipeCard/RecipeCard';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  top: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

const IndexPage = (props) => {
  const {classes} = props;

  return (
    <Layout>
      <Paper className={classes.top}>
        <Typography variant="headline">Hi people</Typography>
        <Typography variant="subheading" paragraph>
          Welcome to your new Gatsby site using <a href="https://material-ui.com">Material UI</a> for the UI.
        </Typography>
        <Typography variant="subheading" paragraph>
          Now go build something great.
        </Typography>
      </Paper>
        <Grid container spacing={40} className={classes.cardGrid}>
        {
          props.data.allNodeRecipe.edges.map(({ node: recipe }) => (
            <Grid item key={recipe.title} xs={12} md={4}>
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


    </Layout>
  );
};

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndexPage);

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
