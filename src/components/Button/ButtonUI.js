import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    borderRadius: '20px'
  },
  input: {
    display: 'none',
  },
});

function ButtonUI(props) {
  const { classes } = props;
  return (
    <div className="btn-ui-container">
      <Button 
        variant="contained" 
        onClick={props.action}
        color={props.color}
        className={classes.button}>
        {props.label}
      </Button>
    </div>
  );
}

ButtonUI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonUI);
