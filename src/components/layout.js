import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Navigation from './Navigation/Navigation';

import drupalOauth from '../components/drupal-oauth/drupalOauth';
import withDrupalOauthProvider from '../components/drupal-oauth/withDrupalOauthProvider';

import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

const drupalOauthClient = new drupalOauth({
  drupal_root: 'http://gatsby-drupal.ddev.local',
  client_id: '448d13ae-c82c-4401-863d-a2d95554ecaa',
  client_secret: 'gatsby',
});

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const Layout = (props) => {
  const {children} = props;
  const {classes} = props;

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {name: 'description', content: 'Sample'},
              {name: 'keywords', content: 'sample, something'},
            ]}
          >
            <html lang="en"/>
          </Helmet>
          <div className={classes.root}>
            <Navigation siteTitle={data.site.siteMetadata.title}/>
            <main>
              {children}
            </main>
          </div>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const LayoutWithStyles = withRoot(withStyles(styles)(Layout));
export default withDrupalOauthProvider(drupalOauthClient, LayoutWithStyles);
