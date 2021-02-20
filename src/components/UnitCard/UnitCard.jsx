import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";

const UnitCard = ({
  unitName,
  unitCategory,
  unitPrice,
  unitImage,
  unitCategoryIcon,
  unitSemicircleIcon,
}) => {
  return (
    <div
      class="unit_card"
      style={{ position: "relative", cursor: "pointer" }}
      title={unitName}
    >
      <Typography
        className="unit_card_top position_absolute"
        variant="h6"
        component="p"
      >
        {unitPrice}
      </Typography>
      <img
        src={require(`../../images/${unitImage}.png`).default}
        alt="Unit Card Image"
        width="60"
        height="130"
      />
      <img
        className="unit_card position_absolute"
        src={require(`../../images/unit_card_frame_plain.png`).default}
        alt="Unit Card Frame"
        width="60"
        height="130"
      ></img>
      <img
        className="position_absolute"
        src={require(`../../images/${unitSemicircleIcon}.png`).default}
        alt="Unit Card Semicircle Icon"
        width="55"
        height="35"
      />
      <img
        className="position_absolute"
        src={require(`../../images/${unitCategoryIcon}.png`).default}
        alt="Unit Card Category Icon"
        width="22"
        height="22"
      />
      <img
        className="unit_card unit_card_hover position_absolute"
        src={require(`../../images/unit_card_hover.png`).default}
        alt="Unit Card Hover"
        width="60"
        height="130"
      />
    </div>
  );
};

export default UnitCard;
