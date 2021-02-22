import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";

const UnitCard = (props) => {
  const handleClick = () => {
    const { id, onAddUnit, onRemoveUnit, addUnit, unit } = props;
    if (addUnit) {
      onAddUnit(props);
    } else {
      onRemoveUnit(props.id, props.price);
    }
  };

  return (
    <div
      className="unit_card"
      style={{ position: "relative", cursor: "pointer" }}
      title={props.name}
      onClick={handleClick}
    >
      <Typography
        className="unit_card_top position_absolute"
        variant="h6"
        component="p"
      >
        {props.price}
      </Typography>
      <img
        src={require(`../../images/${props.image}.png`).default}
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
        src={require(`../../images/${props.semicircle_icon}.png`).default}
        alt="Unit Card Semicircle Icon"
        width="55"
        height="35"
      />
      <img
        className="position_absolute"
        src={require(`../../images/${props.category_icon}.png`).default}
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
