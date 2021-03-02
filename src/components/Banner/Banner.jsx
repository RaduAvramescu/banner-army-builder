import React from "react";

import { Box, Typography } from "@material-ui/core";

const Banner = () => {
  return (
    <Box align="center" my="1rem">
      <picture>
        <source type="image/webp" srcSet="images/logo_wh2.webp" />
        <source type="image/jpeg" srcSet="images/logo_wh2.jpg" />
        <img
          className="imgResponsive"
          src="images/logo_wh2.jpg"
          alt="Banner Army Builder Banner"
          width="903"
          height="382"
        />
      </picture>
      <Typography variant="h2" component="h1">
        <Box fontWeight="fontWeightBold" letterSpacing={5}>
          BANNER ARMY BUILDER
        </Box>
      </Typography>
    </Box>
  );
};

export default Banner;
