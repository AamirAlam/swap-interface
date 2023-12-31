//styling in style/form.css
import React, { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { formatCurrency } from "../../hooks/helpers";
import Dropdown from "../Dropdown";

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
        <Dropdown
          selected={props.tokenTo}
          options={props.availableTokens}
          handleTokenChange={props.handleTokenChange}
        />
      </form-field>

      <form-field class="number">
        <label className="solid-voice" htmlFor="amountTo">
          You Recieve: ${formatCurrency(props.token1USD)}
        </label>

        {/* keep this version aamir */}
        <p className="notice-voice fake-input" ref={amountToRef}>
          {props.amountTo}
        </p>
      </form-field>
    </fieldset>
  );
}
