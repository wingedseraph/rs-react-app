type InputProps = {
  onChange: (value: string) => void;
  value: string;
};

export function Input({ onChange, value }: InputProps) {
  return (
    <input
      className="outline-0"
      onChange={(event_) => onChange(event_.target.value)}
      placeholder="type to search..."
      type="text"
      value={value}
    />
  );
}
