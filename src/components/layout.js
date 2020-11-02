import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Navigation from './Navigation/Navigation';

import drupalOauth from '../components/drupal-oauth/drupalOauth';
import withDrupalOauthProvider from '../components/drupal-oauth/withDrupalOauthProvider';

const drupalOauthClient = new drupalOauth({
  drupal_root: 'http://dev-gatsby-drupal-demo.pantheonsite.io/',
  client_id: 'ffa31eab-16ac-40b2-99a7-46acace22766',
  client_secret: 'gatsby',
});

const Layout = (props) => {
  const {children} = props;

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
          <Container maxWidth="lg">
            <Navigation siteTitle={data.site.siteMetadata.title}/>
            <Box component="main">
              {children}
            </Box>
          </Container>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withDrupalOauthProvider(drupalOauthClient, Layout);
