import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'gatsby'
import Img from 'gatsby-image';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
		minHeight: 310,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const RecipeCard = (props) => {
  const { classes } = props;
  const RecipeLink = props => console.log(props) || <Link to={props.path} {...props}>Read more</Link>;

  return (
    <Card className={classes.card}>
      {props.image.localFile && 
        <Link to={props.path}>
          <Img fluid={props.image.localFile.childImageSharp.fluid} />
        </Link>
      }
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {props.category}
        </Typography>
        <Typography variant="headline" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" dangerouslySetInnerHTML={{ __html: props.summary }} />
      </CardContent>
      <CardActions>
        <Button size="small" path={props.path} component={RecipeLink} />
      </CardActions>
    </Card>
  );
};

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  image: PropTypes.object,
};

export default withStyles(styles)(RecipeCard);
