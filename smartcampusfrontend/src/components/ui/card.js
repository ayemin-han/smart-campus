export const Card = ({ className = "", ...props }) => (
  <div {...props} className={`rounded-xl border border-gray-200 shadow-sm ${className}`} />
);
