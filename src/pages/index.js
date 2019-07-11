import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/layout'

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
        <Link to="/page-2/">Go to page 2</Link>
      </Paper>
    </Layout>
  );
};

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default IndexPage;
