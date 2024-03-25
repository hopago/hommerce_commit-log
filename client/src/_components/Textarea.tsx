type TextareaProps = {
  headingTitle?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void);
  placeholder?: string;
  required?: boolean;
};

export default function Textarea({
  headingTitle,
  value,
  onChange,
  placeholder,
  required,
}: TextareaProps) {
  return (
    <>
      {headingTitle && <h1>{headingTitle}</h1>}
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required ?? true}
        spellCheck={false}
        autoComplete="off"
      />
    </>
  );
}
