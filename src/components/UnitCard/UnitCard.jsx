import React from "react";

import Typography from "@material-ui/core/Typography";
import UnitDialog from "../UnitDialog/UnitDialog";

const UnitCard = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (mount, spell) => {
    const { id, onUnitRemove, addUnit, onUnitAdd, ...newProps } = props;
    setOpen(false);
    onUnitAdd(newProps, mount, spell);
  };

  const handleClick = () => {
    const { addUnit } = props;
    if (addUnit) {
      const { id, onUnitRemove, addUnit, onUnitAdd, ...newProps } = props;
      if (props.hasOwnProperty("mounts") && !open) {
        setOpen(true);
      } else onUnitAdd(newProps);
    } else {
      const { id, multiplayer_cost, unit_size, onUnitRemove } = props;
      onUnitRemove(id, multiplayer_cost, unit_size);
    }
  };

  let semicircle_icon;

  if (props.caste === "Lords" || props.caste === "Heroes")
    semicircle_icon = "unit_card_semicircle_hero";
  else if (props.ror === true) semicircle_icon = "unit_card_semicircle_renown";
  else semicircle_icon = "unit_card_semicircle";
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
          {props.multiplayer_cost}
        </Typography>
        <img src={`images/unit_card/card_icon/${props.unit_card}.png`}
          alt="Unit Card Image"
          width="60"
          height="130"
          loading="lazy"
        />
        <img
          className="unit_card position_absolute"
          src={`images/unit_card/effects/unit_card_frame_plain.png`}
          alt="Unit Card Frame"
          width="60"
          height="130"
          loading="lazy"
        ></img>

        <img
          className="position_absolute"
          src={
            `images/unit_card/semicircle_icon/${semicircle_icon}.png`}
          alt="Unit Card Semicircle Icon"
          width="55"
          height="35"
          loading="lazy"
        />
        <img
          className="position_absolute"
          src={
            `images/unit_card/category_icon/${props.category_icon}.png`}
          alt="Unit Card caste Icon"
          width="22"
          height="22"
          loading="lazy"
        />
        <img
          className="unit_card unit_card_hover position_absolute"
          src={
            `images/unit_card/effects/unit_card_hover.png`}
          alt="Unit Card Hover"
          width="60"
          height="130"
          loading="lazy"
        />
      </div>
      <UnitDialog open={open} onClose={handleClose} {...props} />
    </React.Fragment>
  );
};

export default UnitCard;
