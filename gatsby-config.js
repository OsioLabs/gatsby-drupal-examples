module.exports = {
  siteMetadata: {
    title: 'Gatsby & Drupal',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-material-ui',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-drupal`,
      options: {
        //baseUrl: `http://dev-gatsby-drupal-demo.pantheonsite.io/`,
        baseUrl: `http://gatsby-drupal-demo.ddev.site/`,
        apiBase: `jsonapi`, // optional, defaults to `jsonapi`
      },
    },
  ],
}
