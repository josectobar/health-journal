import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import logo2 from '../../logo2.png'
import './Nav.scss'

//MaterialUI icons:
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Home from "@material-ui/icons/Home"
import Edit from "@material-ui/icons/Edit"
import Stars from "@material-ui/icons/Stars"

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      color:'white'
    },
    span: {
        fontSize: '9px',
    },
    input: {
      display: 'none',

    },
  });
  

class Nav extends Component {

    render() {
        const { classes } = this.props
        return (
            <>
                {this.props.pathname.includes('/day') &&
                    <nav className="nav-container">
                        <img className="logo-nav" src={logo2} alt="logo" />
                        <div className="menu-icons" >
                            <div className='btn-label' aria-label="Home" onClick={() => this.props.history.push('/day/dashboard')}>
                                <Home />
                                <label>Home</label>
                            </div>
                            <div className='btn-label' aria-label="Compose" onClick={() => this.props.history.push('/day/compose')}>                    
                                <Edit />
                                <label>Compose</label>
                            </div>
                            <div className='btn-label' aria-label="Wizard"  onClick={() => this.props.history.push('/wizard/stepone')}>
                                <Stars />
                                <label>Wizard</label>
                            </div>
                        </div>  
                    </nav>
                }
            </>
        );
    }
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withRouter(withStyles(styles)(Nav));

