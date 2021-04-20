import { withStyles, Box, Typography } from "@material-ui/core";
import styles from "./Footer.styles";

const Footer = withStyles(styles)(({ classes }) => (
  <footer className={classes.footer}>
    <Box py="1rem">
      <Box display="flex" justifyContent="center">
        <Typography>Created by:&nbsp;</Typography>
        <Typography component="div">
          <a
            className={classes.footer__link}
            target="_blank"
            href="https://www.youtube.com/c/PrussianPrinceYT"
            aria-label="PrussianPrince"
            rel="noreferrer"
          >
            <Box fontWeight="fontWeightBold">PrussianPrince</Box>
          </a>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography>Ideated by:&nbsp;</Typography>
        <Typography component="div">
          <a
            className={classes.footer__link}
            target="_blank"
            href="https://www.youtube.com/channel/UCJtXRY14oOxhvDmTY2Mm1Mg"
            aria-label="Samurai Warrior"
            rel="noreferrer"
          >
            <Box fontWeight="fontWeightBold">Samurai Warrior</Box>
          </a>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography>Assisted by:&nbsp;</Typography>
        <Typography component="div">
          <a
            className={classes.footer__link}
            target="_blank"
            href="https://www.youtube.com/channel/UCMSo43ocZdraDR6k-7adD1A"
            aria-label="Enticity"
            rel="noreferrer"
          >
            <Box fontWeight="fontWeightBold">Enticity</Box>
          </a>
        </Typography>
        <Typography>,&nbsp;</Typography>
        <Typography component="div">
          <a
            className={classes.footer__link}
            target="_blank"
            href="https://twwstats.com"
            aria-label="TWW Stats"
            rel="noreferrer"
          >
            <Box fontWeight="fontWeightBold">TWW Stats</Box>
          </a>
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightBold">, BobTresh</Box>
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightBold">, Achilles</Box>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography>2021</Typography>
      </Box>
    </Box>
  </footer>
));

export default Footer;
