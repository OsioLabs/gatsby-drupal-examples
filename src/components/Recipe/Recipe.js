import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import GridList from '@material-ui/core/GridList';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import RecipeList from '../RecipeList/RecipeList';

import withDrupalOauthConsumer from '../drupal-oauth/withDrupalOauthConsumer';

const styles = theme => ({
  progressBar: {
    margin: '2em 0',
  }
});

class Recipe extends React.Component {
  state = {
    ingredients: [],
    instructions: '',
  };

  async componentDidMount() {
    // If we've gotten here we can assume the user is logged in since this
    // component is only ever used for authenticated users. Grab the token we
    // need to make requests to Drupal.
    const token = this.props.drupalOauthClient.isLoggedIn();

    const headers = new Headers({
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `${token.token_type} ${token.access_token}`
    });

    const options = {
      method: 'GET',
      headers,
    };

    const url = `http://gatsby-drupal.ddev.local/jsonapi/node/recipe/${this.props.uuid}`
    
    let data;
    try {
      let response = await fetch(url, options);
      data = await response.json();

      // Validate the response.
      if (data === null || data.data === undefined || data.data === null) {
        throw new Error('No valid data received from the API.');
      }
    } catch(err) {
      console.log(`API error: ${err}`);
    }

    this.setState({
      ingredients: data.data.attributes.field_ingredients,
      instructions: data.data.attributes.field_recipe_instruction.processed,
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <>
        <Img fluid={this.props.image.localFile.childImageSharp.fluid} />
        <Typography variant="headline" paragraph>{this.props.title}</Typography>
        <GridList cols={5} cellHeight="auto">
          <ListItem>
          <ListItemText primary="Difficulty" secondary={this.props.difficulty} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Cooking time" secondary={`${this.props.cooking_time} minutes`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Preparation time" secondary={`${this.props.preparation_time} minutes`} />
          </ListItem>
          <ListItem>
          <ListItemText primary="Category" secondary={this.props.category} />
        </ListItem>
        {this.props.tags &&
        <ListItem>
          <ListItemText primary="Tags" secondary={this.props.tags.map(item => item.name)}/>
        </ListItem>
        }
        </GridList>

        <Typography variant="subheading">Summary:</Typography>
        <Typography variant="body2" paragraph dangerouslySetInnerHTML={{ __html: this.props.summary }} />

        {this.state.instructions !== '' ?
          <>
            <Typography variant="subheading">Ingredients:</Typography>
            <List dense={true}>
              {
                this.state.ingredients.map((item, index) => <ListItem key={index}>{item}</ListItem>)
              }
            </List>

            <Typography variant="subheading">Preparation:</Typography>
            <Typography variant="body2" paragraph dangerouslySetInnerHTML={{ __html: this.state.instructions }} />
          </>
          :
          <LinearProgress className={classes.progressBar} />
        }

        <Typography variant="subheading">Try another recipe:</Typography>
        <RecipeList/>
      </>
    )
  }
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  cooking_time: PropTypes.number.isRequired,
  preparation_time: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.array,
};

const RecipeWithStyles = withStyles(styles)(Recipe);

export default withDrupalOauthConsumer(RecipeWithStyles);