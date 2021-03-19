import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import UnitDialog from "../UnitDialog";

const styles = () => ({
  position_absolute: {
    position: "absolute",
  },
  unit_card: {
    width: "60px",
    height: "130px",
    top: "0px",
    left: "0px",
    "& img[alt$='Icon']": {
      bottom: "0px",
      left: "2px",
    },
    "& img[alt$='Category Icon']": {
      left: "19px",
    },
    "& img[alt$='Hover']": {
      display: "none",
    },
    "&:hover": {
      "& img[alt$='Hover']": {
        display: "block",
      },
    },
  },
  unit_card_top: {
    width: "100%",
    top: "5px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#c4941c",
  },
});

const UnitCard = withStyles(styles)((props) => {
  const { classes } = props;
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
      if (
        !open &&
        (props.battle_mounts?.length >= 1 || props.spells?.length >= 1)
      ) {
        setOpen(true);
      } else onUnitAdd(newProps);
    } else {
      const { id, multiplayer_cost, unit_size, onUnitRemove } = props;
      onUnitRemove(id, multiplayer_cost, unit_size);
    }
  };

  let semicircle_icon;

  if (props.caste === "Lord" || props.caste === "Hero")
    semicircle_icon = "unit_card_semicircle_hero";
  else if (props.ror === true) semicircle_icon = "unit_card_semicircle_renown";
  else semicircle_icon = "unit_card_semicircle";
  return (
    <React.Fragment>
      <div
        className={classes.unit_card}
        style={{ position: "relative", cursor: "pointer" }}
        title={props.name}
        onClick={handleClick}
      >
        <Typography
          className={`${classes.unit_card_top} ${classes.position_absolute}`}
          variant="h6"
          component="p"
        >
          {props.multiplayer_cost}
        </Typography>
        {props.caste === "Hero" || props.caste === "Lord" ? (
          <img
            src={`images/${props.custom_battle_permissions[0].general_portrait.toLowerCase()}`}
            alt="Unit Card Image"
            width="60"
            height="130"
            loading="lazy"
          />
        ) : (
          <img
            src={`images/${props.unit_card}`}
            alt="Unit Card Image"
            width="60"
            height="130"
            loading="lazy"
          />
        )}

        <img
          className={`${classes.unit_card} ${classes.position_absolute}`}
          src={`images/ui/skins/default/unit_card_frame_plain.png`}
          alt="Unit Card Frame"
          width="60"
          height="130"
          loading="lazy"
        ></img>
        <img
          className={classes.position_absolute}
          src={`images/ui/skins/default/${semicircle_icon}.png`}
          alt="Unit Card Semicircle Icon"
          width="55"
          height="35"
          loading="lazy"
        />
        <img
          className={classes.position_absolute}
          src={`images/ui/common_ui/unit_category_icons/${props.ui_unit_group.icon}.png`}
          alt="Unit Card Category Icon"
          width="22"
          height="22"
          loading="lazy"
        />
        <img
          className={`${classes.unit_card} ${classes.unit_card_hover} ${classes.position_absolute}`}
          src={`images/ui/skins/default/unit_card_hover.png`}
          alt="Unit Card Hover"
          width="60"
          height="130"
          loading="lazy"
        />
      </div>
      <UnitDialog open={open} onClose={handleClose} {...props} />
    </React.Fragment>
  );
});

export default UnitCard;
