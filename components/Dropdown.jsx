import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";

const Control = ({ children, ...props }) => {
  const selectedIcon = props.getValue()[0]?.icon;
  return (
    <components.Control {...props}>
      <picture className="react-select-icon">
        <img src={`/images/${selectedIcon}`} />
      </picture>
      {children}
    </components.Control>
  );
};

const Option = ({ children, ...props }) => (
  <components.Option {...props}>
    <div className="actions">
      <picture className="react-select-icon">
        <img src={`/images/${props.data.icon}`} alt="icon" />
      </picture>
      {children}
    </div>
  </components.Option>
);

export default function Dropdown(props) {
  const options = props.options.map((token, index) => ({
    label: token.symbol,
    value: index,
    ...token,
  }));

  const selected = options.find((el) =>  el.label === props.selected?.symbol) 

  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "var(--color)",
      primary75: "var(--color-light)",
      primary50: "var(--color-lighter)",

      primary25: "var(--color-lightest)",
      neutral0: "var(--color-lightest)",
    },
  });

  //
  const handleOnChange = (e) => {
    const event = {
      target: {
        label: e.label,
        value: e.value,
      },
    };
    props.handleTokenChange(event);
  };

  return (
    <Select
      options={options}
      className={"calm-voice react-select"}
      isSearchable={false}
      theme={theme}
      onChange={handleOnChange}
      defaultValue={selected }
      components={{ Control, Option }}
    />
  );
}
