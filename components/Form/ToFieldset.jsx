//styling in style/form.css
import React, { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function ToFieldset(props) {
  // refs
  const amountToRef = useRef(null);
  const previousAmountToRef = useRef(props.amountTo);

  useEffect(() => {
    gsap.from(amountToRef.current, {
      duration: 1,
      textContent: previousAmountToRef.current,

      ease: "Power1.easeIn",
      stagger: 1,
    });

    previousAmountToRef.current = props.amountTo;
  }, [props.amountTo]);

  // handlers
  const handleTokenChange = (e) => {
    props.handleTokenChange(e);
  };

  return (
    <fieldset className="swap-to">
      <form-field class="dropdown">
        <label className="whisper-voice" htmlFor="tokenTo">
          To
        </label>
        <select name="swap-to" id="tokenTo" onChange={handleTokenChange}>
          {props.availableTokens.map((token, index) => (
            <option
              selected={token.symbol === props?.tokenTo?.symbol}
              key={token.symbol}
              value={index}
            >
              {token.symbol}
            </option>
          ))}
        </select>
      </form-field>

      <form-field class="number">
        <label className="solid-voice" htmlFor="amountTo">
          You Recieve
        </label>

        {/* <p className="notice-voice fake-input" ref={amountToRef}>
          {props.amountTo}
        </p> */}

        <input
        ref={amountToRef}
          id="amountTo"
          type="number"
          value={props.amountTo}
          // step="0.01"
          min="0"
          onChange={props.handleAmountToChange}
          className="notice-voice"
        />
        {/* <p className="in-dollars">
          ${" "}
          {props.tokenTo.rate
            ? props.amountTo * props.tokenTo.rate
            : "Select a token"}
        </p> */}
      </form-field>
    </fieldset>
  );
}
