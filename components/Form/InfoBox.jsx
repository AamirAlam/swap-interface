//styling in style/form.css
import React, { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function InfoBox(props) {
  const oraclePriceRef = useRef(null);
  const dexPriceRef = useRef(null);
  const deviationRef = useRef(null);
  const InfoBoxRef = useRef(null);
  const previousOraclePriceRef = useRef(props.oraclePrice);
  const previousDexPriceRef = useRef(props.dexPrice);
  const previousDeviationRef = useRef(props.deviation);
  const previousAmountToSwapRef = useRef(props.amountToSwap);

  useEffect(() => {
    gsap.from(oraclePriceRef.current, {
      duration: 1,
      textContent: previousOraclePriceRef.current,
      ease: "Power1.easeIn",
      stagger: 1,
    });

    previousOraclePriceRef.current = props.oraclePrice;
  }, [props.oraclePrice]);

  useEffect(() => {
    gsap.from(dexPriceRef.current, {
      duration: 1,
      textContent: previousDexPriceRef.current,
      ease: "Power1.easeIn",
      stagger: 1,
    });

    previousDexPriceRef.current = props.dexPrice;
  }, [props.dexPrice]);

  useEffect(() => {
    gsap.from(deviationRef.current, {
      duration: 1,
      textContent: previousDeviationRef.current,
      ease: "Power1.easeIn",
      stagger: 1,
    });

    previousDeviationRef.current = props.deviation;
  }, [props.deviation]);

  useEffect(() => {
    const listItems = InfoBoxRef.current.querySelectorAll("li");

    if (!props.amountToSwap) {
      gsap.set(listItems, { x: -100, opacity: 0 });
    }

    if (props.amountToSwap > 0 && !previousAmountToSwapRef.current) {
      gsap.to(listItems, {
        duration: 0.1,
        x: 0,
        opacity: 1,
        ease: "Power1.easeIn",
        stagger: 0.1,
      });
    }
  }, [props.amountToSwap]);

  return (
    <ul className="info-box" ref={InfoBoxRef}>
      <li className="solid-voice">
        Oracle price: <span ref={oraclePriceRef}>{props.oraclePrice}</span>
      </li>
      <li className="solid-voice">
        Pool price: <span ref={dexPriceRef}>{props.dexPrice}</span>
      </li>
      <li className="solid-voice">
        Deviation: {props.oraclePrice > props.dexPrice ? "-" : "+"}{" "}
        <span ref={deviationRef}>{props.deviation}</span>
        <span>%</span>
      </li>
    </ul>
  );
}
