import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const AboutPage = () => (
  <Layout>
    <h1>About</h1>
    <p>This application is a curated set of the best recipes around carefully
      selected just for our members.</p>
    <Link to="/">Home</Link>
  </Layout>
)

export default AboutPage
