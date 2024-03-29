type BadgeProps = {
  text: string;
  backgroundColor?: string;
  padding?: number;
  width?: number;
  height?: number;
  border?: string;
  borderRadius?: string | number;
  display?: "flex" | "inline-block" | "block";
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?: "center";
  color?: string;
};

export default function Badge({
  text,
  backgroundColor,
  padding,
  width,
  height,
  border,
  borderRadius,
  display,
  alignItems,
  justifyContent,
  color,
}: BadgeProps) {
  const styles = {
    backgroundColor,
    padding,
    width,
    height,
    border,
    borderRadius,
    display,
    alignItems,
    justifyContent,
    color,
  };

  return (
    <div className="common-badge" style={styles}>
      <span>{text}</span>
    </div>
  );
}
