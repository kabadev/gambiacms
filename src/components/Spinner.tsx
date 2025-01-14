import React from "react";

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-primary-600 ${className}`}
    ></div>
  );
};

export default Spinner;
