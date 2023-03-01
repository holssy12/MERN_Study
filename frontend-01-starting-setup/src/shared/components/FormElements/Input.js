import React from "react";

import "./Input.css";

const Input = (props) => {
  const element =
    // if props.element is "input", then element = input
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    ) : (
      // else element = textarea
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    );

  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
