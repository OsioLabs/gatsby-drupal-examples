import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import withDrupalOauthConsumer from '../drupal-oauth/withDrupalOauthConsumer';
import SignIn from '../SignIn/SignIn';
import LogoutLink from '../LogoutLink/LogoutLink';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menu: {
    display: 'flex',
  },
  menuButton: {
    marginRight: '20px',
  }
};

function Navigation(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="default">
        <Toolbar>
          <Typography variant="h2" className={classes.grow}>{props.siteTitle}</Typography>
          <div className={classes.menu}>
              <Button component={Link} to="/" className={classes.menuButton}>Home</Button>
              {props.userAuthenticated ?
                <>
                  <Button variant="outlined" component={Link} to="/user/profile">My Account</Button>
                  <LogoutLink/>
                </>
                :
                <SignIn />
              }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withDrupalOauthConsumer(Navigation));
