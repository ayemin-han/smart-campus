export const Button = ({ className = "", variant, size, ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition
      ${variant === "ghost" ? "bg-transparent hover:bg-black/5" : ""}
      ${className}`}
  />
);
