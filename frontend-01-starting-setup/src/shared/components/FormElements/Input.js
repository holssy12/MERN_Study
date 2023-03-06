import React, { useReducer, useEffect } from "react";
import { validate } from "../../util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
  // action.type : 액션을 설명하는 고유 식별자.
  switch (action.type) {
    case "CHANGE":
      // 상태는 꼭 객체일 필요는 없다. 무엇이든 가능.
      // 여기서는 여러 개의 상태를 하나의 객체로 관리하고 있기 때문에 객체를 반환.
      return {
        ...state, // 전개 연산자를 사용하여 기존의 상태를 복사.
        value: action.val, // 액션과 함께 전달된 새로운 값으로 value를 업데이트.
        isValid: validate(action.val, action.validators), // 검증 결과를 isValid에 업데이트.
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // useRecducer의 초기 상태를 설정한다.
  // useReducer의 첫 번째 인자는 리듀서 함수이고, 두 번째 인자는 초기 상태이다.
  // useReducer의 반환값은 현재 상태와 상태를 업데이트하는 dispatch 함수이다.
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    // if props.element is "input", then element = input
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      // else element = textarea
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
