export const Badge = ({ className = "", variant = "solid", ...props }) => {
  const base = "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs";
  const styles =
    variant === "outline"
      ? "border border-gray-300 text-gray-700"
      : "bg-gray-800 text-white";
  return <span {...props} className={`${base} ${styles} ${className}`} />;
};
