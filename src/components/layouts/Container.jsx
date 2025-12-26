import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`container mx-auto max-w-3xl font-sans ${className}`}>
      {children}{" "}
    </div>
  );
};

export default Container;
