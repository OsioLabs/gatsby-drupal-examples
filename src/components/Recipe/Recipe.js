import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const Recipe = (props) => (
  <>
    <Typography variant="h2" paragraph>{props.title}</Typography>
    <GridList cols={5} cellHeight="auto">
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

    <Typography variant="subtitle1">Summary:</Typography>
    <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: props.summary }} />

    <Typography variant="subtitle1">Ingredients:</Typography>
    <List dense={true}>
      {
        props.ingredients.map((item, index) => <ListItem key={index}>{item}</ListItem>)
      }
    </List>

    <Typography variant="subtitle1">Preparation:</Typography>
    <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: props.instructions }} />

  </>
);

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  cooking_time: PropTypes.number.isRequired,
  preparation_time: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  summary: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.array,
};

export default Recipe;
