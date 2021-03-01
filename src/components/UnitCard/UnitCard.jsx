import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";
import UnitDialog from "../UnitDialog/UnitDialog";

const UnitCard = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (value) => {
    const { id, onUnitRemove, addUnit, onUnitAdd, ...newProps } = props;
    setOpen(false);
    onUnitAdd(newProps, value);
  };

  const handleClick = () => {
    const { addUnit } = props;
    if (addUnit) {
      const { id, onUnitRemove, addUnit, onUnitAdd, ...newProps } = props;
      if (props.hasOwnProperty("mounts") && !open) {
        setOpen(true);
      } else onUnitAdd(newProps);
    } else {
      const { id, price, modelCount, onUnitRemove } = props;
      onUnitRemove(id, price, modelCount);
    }
  };

  return (
    <React.Fragment>
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
          src={
            require(`../../images/unit_card/card_icon/${props.image}.png`)
              .default
          }
          alt="Unit Card Image"
          width="60"
          height="130"
        />
        <img
          className="unit_card position_absolute"
          src={
            require(`../../images/unit_card/effects/unit_card_frame_plain.png`)
              .default
          }
          alt="Unit Card Frame"
          width="60"
          height="130"
        ></img>
        <img
          className="position_absolute"
          src={
            require(`../../images/unit_card/semicircle_icon/${props.semicircle_icon}.png`)
              .default
          }
          alt="Unit Card Semicircle Icon"
          width="55"
          height="35"
        />
        <img
          className="position_absolute"
          src={
            require(`../../images/unit_card/category_icon/${props.category_icon}.png`)
              .default
          }
          alt="Unit Card Category Icon"
          width="22"
          height="22"
        />
        <img
          className="unit_card unit_card_hover position_absolute"
          src={
            require(`../../images/unit_card/effects/unit_card_hover.png`)
              .default
          }
          alt="Unit Card Hover"
          width="60"
          height="130"
        />
      </div>
      <UnitDialog open={open} onClose={handleClose} {...props} />
    </React.Fragment>
  );
};

export default UnitCard;
