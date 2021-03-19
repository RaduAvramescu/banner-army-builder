import React from "react";
import BuildContainerView from "./BuildContainer.view";

const BuildContainer = ({ fundsRemaining, unit_size, onUnitRemove, units }) => {
  const getClasses = (type) => {
    if (type === "funds")
      if (fundsRemaining >= 1000) return "green";
      else return "yellow";

    if (type === "model")
      if (unit_size < 300) return "red";
      else return "green";
  };

  return (
    <BuildContainerView
      onGetClasses={getClasses}
      fundsRemaining={fundsRemaining}
      unit_size={unit_size}
      onUnitRemove={onUnitRemove}
      units={units}
    />
  );
};

export default BuildContainer;
