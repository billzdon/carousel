import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { mapAllToProps } from '../mappers/mappers.js'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'
import Home from '@material-ui/icons/Home';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import ViewModule from '@material-ui/icons/ViewModule';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    color: 'white'
  },
  smallIcon: {
    paddingTop: '3px'
  }
}

export default withStyles(styles)(connect(mapAllToProps)(class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const {classes} = this.props

    return <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
           <MenuIcon />
         </IconButton>*/}
         <Typography variant="title" color="inherit" className={classes.flex}>
            Carousel Demo
         </Typography>
         <Tooltip title="Reorder Images">
           <Link className={classes.link} to='/reorder'>
              <IconButton
                color="inherit"
              >
                <ViewModule className={classes.smallIcon}/>
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Carousel Home">
            <Link className={classes.link} to='/'>
              <IconButton
                color="inherit"
              >
                <Home />
              </IconButton>
            </Link>
          </Tooltip>
       </Toolbar>
      </AppBar>
    </div>
  }
}))
