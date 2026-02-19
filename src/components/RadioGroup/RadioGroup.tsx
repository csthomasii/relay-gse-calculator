import "./RadioGroup.css";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
}

export function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="radio-group" role="radiogroup" aria-label={name}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`radio-option ${value === option.value ? "radio-option--selected" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="radio-option__indicator" />
          <span className="radio-option__label">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
