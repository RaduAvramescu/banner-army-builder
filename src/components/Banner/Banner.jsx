import React from "react";
import Box from "@material-ui/core/Box";

export default function Banner() {
  return (
    <Box align="center" my="1rem">
      <picture>
        <source type="image/webp" srcSet="images/logo_bab.webp" />
        <source type="image/jpeg" srcSet="images/logo_bab.jpg" />
        <img
          className="imgResponsive"
          src="images/logo_bab.jpg"
          alt="Banner Army Builder Banner"
          width="943"
          height="456"
        />
      </picture>
    </Box>
  );
}
