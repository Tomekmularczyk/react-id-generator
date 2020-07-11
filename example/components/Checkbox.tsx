import React from "react";
import { useId } from "../../lib";

const Checkbox: React.FC = () => {
  const [id1] = useId();
  return (
    <div>
      <label htmlFor={id1}>Checkbox with id: {id1}</label>
      <input type="checkbox" id={id1} />
    </div>
  );
};

export default Checkbox;
