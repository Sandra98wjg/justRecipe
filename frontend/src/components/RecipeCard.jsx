import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

// this components is used to create the recipe card
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      onClick={() => (window.location.href = `/recipes/${props.id}`)}
    >
      <CardHeader
        avatar={<Avatar sx={{ width: 80, height: 80 }}>U</Avatar>}
        title={
          props.title.length <= 20
            ? props.title
            : props.title.slice(0, 18) + "..."
        }
        subheader={props.name}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.img}
        alt={props.title}
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.types}
        </Typography>
      </CardContent>
    </Card>
  );
}
