import React, { useState, useReducer, useRef, useEffect } from "react";
import AppView from "./App.view";

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "RESET_FACTION":
        return {
          ...state,
          funds: 12400,
          models: 0,
          units: [],
        };

      case "ADD_UNIT":
        return {
          ...state,
          funds: state.funds - action.payload.props.multiplayer_cost,
          models: state.models + action.payload.props.unit_size,
          units: action.payload.newUnits,
        };

      case "REMOVE_UNIT":
        return {
          ...state,
          funds: state.funds + action.payload.multiplayer_cost,
          models: state.models - action.payload.unit_size,
          units: action.payload.newUnits,
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    funds: 12400,
    models: 0,
    units: [],
  });
  const [selectedFaction, setSelectedFaction] = useState("");
  const { funds, models, units } = state;

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = [...value];
    }, [...value]);
    return ref.current;
  };
  const prevUnits = usePrevious(units);

  const handleFactionChange = (selectedFaction) => {
    setSelectedFaction(selectedFaction);
    dispatch({ type: "RESET_FACTION" });
  };

  const handleUnitCanAdd = (props, mount, spell) => {
    let { ...newProps } = props;

    if (mount || spell) newProps = handleUpdateUnit(newProps, mount, spell);

    const {
      name,
      multiplayer_cost,
      caste,
      limited_type,
      unit_size,
      basePrice,
      isMissile,
      is360,
      isFlyer,
      isSpecial,
      hasBreath,
      hasDrain,
      variantUnit,
      ror,
      spells,
      ui_unit_group,
    } = newProps;

    if (caste !== "Lord" && (!units[0] || units[0].caste !== "Lord"))
      return alert("You have to pick a Lord first!");

    if (multiplayer_cost > funds) return alert("You don't have enough funds!");

    if (caste === "Lord")
      if (units.find((unit) => unit.caste === "Lord"))
        handleUnitRemove(0, units[0].multiplayer_cost, units[0].unit_size);

    if (units.length === 20)
      return alert("You cannot have more than 20 units!");

    if (handleVerifyDuplicates("countSame", newProps) === 5)
      return alert("You can't have more than 5 of the same unit!");

    if (
      ui_unit_group.name === "Chariot" ||
      ui_unit_group.name === "Missile Chariot" ||
      ui_unit_group.name === "Monstrous Chariot"
    )
      if (handleVerifyDuplicates("countChariots", newProps) === 4)
        return alert(`You can't have more than 4 Chariots!`);
      else if (limited_type === "Restricted")
        if (handleVerifyDuplicates("countSame", newProps) === 1)
          return alert(`You can't have more than 1 ${name}!`);

    if (unit_size === 1) {
      if (caste === "Hero") {
        if (handleVerifyDuplicates("isSE", newProps) === 5)
          return alert("You can't have more than 5 Single Entity (SE) units!");

        if (handleVerifyDuplicates("countCategory", newProps) === 2)
          return alert("You can't have more than 2 Heroes!");

        if (
          newProps.hasOwnProperty("isNamed") &&
          handleVerifyDuplicates("countSame", newProps) === 1
        )
          return alert(
            "You can't have more than 1 of the same named character!"
          );
      }

      if (caste === "Monster") {
        if (handleVerifyDuplicates("isSEM", newProps) === 3)
          return alert(
            "You can't have more than 3 Single Entity Monsters (SEM)!"
          );

        if (
          multiplayer_cost >= 1800 &&
          handleVerifyDuplicates("SEMCost", newProps) === 2
        )
          return alert(
            "You can't have more than 2 Single Entity Monsters (SEM) that cost over 1800!"
          );
      }

      if (handleVerifyDuplicates("countSame", newProps) === 2)
        return alert(
          "You can't have more than 2 of the same Single Entity (SE) units!"
        );
    }

    if (isMissile)
      if (handleVerifyDuplicates("isMissile", newProps) === 12)
        return alert("You can't have more than 12 missile units!");

    if (is360)
      if (handleVerifyDuplicates("is360", newProps) === 6)
        return alert(
          "You can't have more than 6 units with 360 degree firing arc!"
        );

    if (isFlyer)
      if (handleVerifyDuplicates("isFlyer", newProps) === 5)
        return alert("You can't have more than 5 flying units!");

    if (isSpecial)
      if (handleVerifyDuplicates("isSpecial", newProps) === 1)
        return alert(
          `Your faction has a special rule regarding ${newProps.limiter} that does not allow this!`
        );

    if (hasBreath)
      if (handleVerifyDuplicates("hasBreath", newProps) === 2)
        return alert("You can't have more than 2 units with breath attacks!");

    if (hasDrain)
      if (handleVerifyDuplicates("hasDrain", newProps) === 1)
        return alert("You can't have more than 1 unit with a HP drain effect!");

    if (variantUnit)
      if (handleVerifyDuplicates("variantUnit", newProps) === 8)
        return alert("You can't have more than 8 units of a unit variant!");

    if (
      (caste === "Melee Infantry" || caste === "Missile Infantry") &&
      (ui_unit_group.parent_group.onscreen_name === "Infantry" ||
        ui_unit_group.parent_group.onscreen_name === "Missile Infantry")
    ) {
      if (
        (!ror && multiplayer_cost >= 901 && multiplayer_cost <= 1100) ||
        (basePrice >= 901 && basePrice <= 1100)
      )
        if (handleVerifyDuplicates("countSame", newProps) === 4)
          return alert(
            `You can't have more than 4 of a ${caste} unit with 901-1100 price!`
          );

      if ((!ror && multiplayer_cost >= 1101) || basePrice >= 1101)
        if (handleVerifyDuplicates("countSame", newProps) === 3)
          return alert(
            `You can't have more than 3 of a ${caste} unit with 1101+ price!`
          );
    }

    if (
      ui_unit_group.parent_group.onscreen_name !== "Infantry" &&
      ui_unit_group.parent_group.onscreen_name !== "Missile Infantry"
    ) {
      if (handleVerifyDuplicates("countSame", newProps) === 4)
        return alert(
          `You can't have more than 4 of the same ${ui_unit_group.parent_group.onscreen_name} unit!`
        );

      if ((!ror && multiplayer_cost >= 1201) || basePrice >= 1201)
        if (handleVerifyDuplicates("countSame", newProps) === 3)
          return alert(
            `You can't have more than 3 of the same ${ui_unit_group.parent_group.onscreen_name} unit with 1201+ price!`
          );
    }

    if (
      ui_unit_group.parent_group.onscreen_name === "Missile Cavalry & Chariots"
    )
      if (handleVerifyDuplicates("countCategory", newProps) === 6)
        return alert(
          `You can't have more than 6 ${ui_unit_group.parent_group.onscreen_name}!`
        );

    if (ror)
      if (handleVerifyDuplicates("countSame", newProps) === 1)
        return alert("You can't have more than 1 of the same RoR!");

    if (spells)
      if (handleVerifyDuplicates("countSpells", newProps) === 1)
        return alert("You can't have more than 1 of the same Spell!");

    handleUnitAdd(newProps);
  };

  const handleUpdateUnit = (props, mount, spell) => {
    let { ...newProps } = props;
    if (mount) {
      // const unitProperties = [
      //   "isSEM",
      //   "isFlyer",
      //   "hasBreath",
      //   "hasDrain",
      //   "isSpecial",
      // ];
      // unitProperties.forEach((property) => {
      //   if (mount.hasOwnProperty(property)) newProps[property] = true;
      // });
    }

    if (spell) newProps.spells = spell;

    return newProps;
  };

  const handleUnitAdd = (props) => {
    const newUnits = prevUnits;

    newUnits.push(props);
    newUnits.sort((a, b) => (a.multiplayer_cost < b.multiplayer_cost ? 1 : -1));
    newUnits.sort((a, b) =>
      a.ui_unit_group.parent_group.order > b.ui_unit_group.parent_group.order
        ? 1
        : -1
    );
    dispatch({ type: "ADD_UNIT", payload: { props, newUnits } });
  };

  const handleUnitRemove = (id, multiplayer_cost, unit_size) => {
    const newUnits = prevUnits;

    newUnits.splice(id, 1);
    dispatch({
      type: "REMOVE_UNIT",
      payload: { id, multiplayer_cost, unit_size, newUnits },
    });
  };

  const handleVerifyDuplicates = (validation, props) => {
    let count = 0;

    if (validation === "countSame") {
      count = units.filter((el) => {
        if (
          el.name === props.name ||
          (el.hasOwnProperty("baseUnit") && el.baseUnit === props.baseUnit)
        )
          return count + 1;
      }).length;
      return count;
    }

    if (validation === "countCategory") {
      count = units.filter(
        (el) =>
          el.ui_unit_group.parent_group.onscreen_name ===
          props.ui_unit_group.parent_group.onscreen_name
      ).length;
      return count;
    }

    if (validation === "isSpecial") {
      count = units.filter((el) => {
        if (el.hasOwnProperty("isSpecial") && el.isSpecial === props.isSpecial)
          if (el.name === props.limiter || props.name === props.limiter)
            return count + 1;
      }).length;
      return count;
    }

    if (validation === "isSE") {
      count = units.filter((el) => {
        if (el.unit_size === 1) return el;
      }).length;
      return count;
    }

    if (validation === "isSEM") {
      count = units.filter((el) => {
        if (el.unit_size === 1 && el.caste === "Monster") return el;
      }).length;
      return count;
    }

    if (validation === "countChariots") {
      count = units.filter((el) => {
        if (
          el.ui_unit_group.name === "Chariot" ||
          el.ui_unit_group.name === "Missile Chariot" ||
          el.ui_unit_group.name === "Monstrous Chariot"
        )
          return el;
      }).length;
      return count;
    }

    if (validation === "SEMCost") {
      count = units.filter((el) => {
        if (
          el.multiplayer_cost >= 1800 &&
          el.unit_size === 1 &&
          el.caste === "Monster"
        )
          return el;
      }).length;
      return count;
    }

    if (validation === "countSpells") {
      count = units.filter((unit) => {
        const found = unit.spells?.filter((el) => {
          const found2 = props.spells?.find(
            (originalSpell) => originalSpell.name === el.name
          );
          if (found2) return found2;
        });
        if (found.length > 0) return found;
      }).length;

      return count;
    }

    if (typeof validation === "string") {
      count = units.filter((el) => {
        if (el[validation] === props[validation]) return count + 1;
      }).length;
    } else {
      count = units.filter((el) => {
        if (el.limited_type === props.limited_type) return count + 1;
      }).length;
    }
    return count;
  };

  return (
    <AppView
      selectedFaction={selectedFaction}
      funds={funds}
      models={models}
      units={units}
      onUnitCanAdd={handleUnitCanAdd}
      onUnitRemove={handleUnitRemove}
      onFactionChange={handleFactionChange}
    />
  );
}

export default App;
