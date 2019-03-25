import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 240,

  },
  p: {
    textAlign: 'left'
  }
};

function ArticlesCard(props) {
  const { content, title, urlToImage, source, url  } = props.article
  const { classes } = props
  return (
    <Card className={classes.card}>
      <CardActionArea
        target="_blank"
        href={url}>
        <CardMedia
          className={classes.media}
          image={urlToImage}
        />
        <CardContent
          title={source}
          >
          <Typography 
            gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography
            className={classes.p}
            component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          target="_blank"
          href={url}
          >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

ArticlesCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticlesCard);