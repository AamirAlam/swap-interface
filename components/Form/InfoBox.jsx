//styling in style/form.css

export default function InfoBox(props) {
  return (
    <ul className="info-box">
      <li className="solid-voice">
        Oracle price: <span>{props.oraclePrice}</span>
      </li>
      <li className="solid-voice">
        Pool price: <span>{props.dexPrice}</span>
      </li>
      <li className="solid-voice">
        Deviation:
        <span>
          {props.deviation
            ? props.oraclePrice > props.dexPrice
              ? ` - ${props.deviation}%`
              : ` + ${props.deviation}%`
            : ``}
        </span>
      </li>
    </ul>
  );
}
