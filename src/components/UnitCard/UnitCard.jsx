import React from "react";

const UnitCard = ({ unitName, unitCategory, unitPrice, unitImage }) => {
  return (
    <img
      src={require(`../../images/bst_ch_malagor_0.png`).default}
      alt={unitName}
      title={unitName}
      width="60"
      height="130"
    ></img>
  );
};

export default UnitCard;
