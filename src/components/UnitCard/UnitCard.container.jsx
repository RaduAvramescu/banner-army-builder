import { Fragment, useState } from "react";
import { withStyles, Typography } from "@material-ui/core";
import UnitDialog from "../UnitDialog";
import styles from "./UnitCard.styles";

const UnitCard = withStyles(styles)((props) => {
  const {
    classes,
    caste,
    ror,
    name,
    id,
    multiplayer_cost,
    unit_size,
    custom_battle_permissions,
    battle_mounts,
    spells,
    unit_card,
    ui_unit_group,
    addUnit,
    onUnitRemove,
  } = props;
  const [open, setOpen] = useState(false);

  const handleClose = (mount, spell) => {
    const { id, onUnitRemove, addUnit, onUnitAdd, ...newProps } = props;
    setOpen(false);
    onUnitAdd(newProps, mount, spell);
  };

  const handleClick = () => {
    if (addUnit) {
      const { id, onUnitRemove, addUnit, onUnitAdd, ...newProps } = props;
      if (!open && (battle_mounts?.length >= 1 || spells?.length >= 1))
        setOpen(true);
      else onUnitAdd(newProps);
    } else onUnitRemove(id, multiplayer_cost, unit_size);
  };

  let semicircle_icon;

  if (caste === "Lord" || caste === "Hero")
    semicircle_icon = "unit_card_semicircle_hero";
  else if (ror === true) semicircle_icon = "unit_card_semicircle_renown";
  else semicircle_icon = "unit_card_semicircle";

  return (
    <Fragment>
      <div
        className={classes.unit_card}
        style={{ position: "relative", cursor: "pointer" }}
        title={name}
        onClick={handleClick}
      >
        <Typography
          className={`${classes.unit_card_top} ${classes.position_absolute}`}
          variant="h6"
          component="p"
        >
          {multiplayer_cost}
        </Typography>
        {caste === "Hero" || caste === "Lord" ? (
          <img
            src={`images/${custom_battle_permissions[0].general_portrait.toLowerCase()}`}
            alt="Unit Card Content"
            width="60"
            height="130"
            loading="lazy"
          />
        ) : (
          <img
            src={`images/${unit_card}`}
            alt="Unit Card Content"
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
          src={`images/ui/common_ui/unit_category_icons/${ui_unit_group.icon}.png`}
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
    </Fragment>
  );
});

export default UnitCard;
