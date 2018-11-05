import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = ({ siteTitle }) => (
  <Toolbar>
    <Typography
      variant="headline"
    >
      {siteTitle}
    </Typography>
  </Toolbar>

)

export default Header
