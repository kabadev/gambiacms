import React from "react";

interface ErrorMessageProps {
  title: string;
  text: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, text }) => {
  return (
    <div className="text-red-500 p-4">
      <h3 className="font-bold">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default ErrorMessage;
