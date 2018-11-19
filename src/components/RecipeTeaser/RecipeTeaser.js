import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import RecipeList from '../RecipeList/RecipeList';
import SignIn from '../SignIn/SignIn';

const styles = theme => ({
  cta: {
    margin: '2em 0',
    padding: '1em',
    background: '#ececec',
    border: '1px solid #999',
  },
  ctaSignIn: {
    display: 'inline',
  },
  recipeList: {
    marginTop: '2em',
  }
});

const RecipeTeaser = (props) => (
  <>
    <Img fluid={props.image.localFile.childImageSharp.fluid} />
    <Typography variant="headline" paragraph>{props.title}</Typography>
    <GridList cols="5" cellHeight="auto">
      <ListItem>
      <ListItemText primary="Difficulty" secondary={props.difficulty} />
    </ListItem>
    <ListItem>
      <ListItemText primary="Cooking time" secondary={`${props.cooking_time} minutes`} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Preparation time" secondary={`${props.preparation_time} minutes`} />
      </ListItem>
      <ListItem>
      <ListItemText primary="Category" secondary={props.category} />
    </ListItem>
    {props.tags &&
    <ListItem>
      <ListItemText primary="Tags" secondary={props.tags.map(item => item.name)}/>
    </ListItem>
    }
    </GridList>

    <Typography variant="subheading">Summary:</Typography>
    <Typography variant="body2" paragraph dangerouslySetInnerHTML={{ __html: props.summary }} />

    <Card raised={true}>
      <CardContent>
        <Typography variant="body" component="strong">
          <SignIn /> to view the complete content of this recipe.
        </Typography>  
      </CardContent>
    </Card>

    <div className={props.classes.recipeList}>
      <Typography variant="subheading">Try another recipe:</Typography>
      <RecipeList />
    </div>
  </>
);

RecipeTeaser.propTypes = {
  title: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  cooking_time: PropTypes.number.isRequired,
  preparation_time: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.array,
};

export default withStyles(styles)(RecipeTeaser);
