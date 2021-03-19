import React from "react";
import BuildContainerView from "./BuildContainer.view";

const BuildContainer = ({ fundsRemaining, unit_size, onUnitRemove, units }) => {
  const getClasses = (type) => {
    if (type === "funds") return fundsRemaining >= 1000 ? "green" : "yellow";

    if (type === "model") return unit_size < 300 ? "red" : "green";
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
