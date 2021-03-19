import { withStyles } from "@material-ui/core";
import styles from "./Loader.styles";

const Loader = withStyles(styles)(({ classes }) => (
  <div className={classes.loader} />
));

export default Loader;
