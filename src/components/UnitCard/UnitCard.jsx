import React from "react";

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
      <img
        src={require(`../../images/${unitImage}.png`).default}
        alt="Unit Card Image"
        width="60"
        height="130"
      />
      <img
        src={require(`../../images/unit_card_frame_plain.png`).default}
        alt="Unit Card Frame"
        width="60"
        height="130"
        style={{ position: "absolute", top: "0px", left: "0px" }}
      ></img>
      <img
        src={require(`../../images/${unitSemicircleIcon}.png`).default}
        alt="Unit Card Category"
        width="55"
        height="35"
        style={{ position: "absolute", bottom: "0px", left: "2px" }}
      />
      <img
        src={require(`../../images/${unitCategoryIcon}.png`).default}
        alt="Unit Card Category"
        width="22"
        height="22"
        style={{ position: "absolute", bottom: "0px", left: "19px" }}
      />
      <img
        class="unit_card_hover"
        src={require(`../../images/unit_card_hover.png`).default}
        alt="Unit Card Hover"
        width="60"
        height="130"
        style={{ position: "absolute", top: "0px", left: "0px" }}
      />
    </div>
  );
};

export default UnitCard;
