import React, { useState } from "react";
import Button from "./Button";

interface ExpandableTextProps {
  maxChars?: number;
  children: string;
}

const ExpandableText = ({ maxChars = 100, children }: ExpandableTextProps) => {
  const [isExpanded, setExpanded] = useState(false);

  if (children.length <= maxChars) return <p>{children}</p>;
  const text = isExpanded ? children : children.substring(0, maxChars);

  const handleClick = () => {
    setExpanded(!isExpanded);
  };

  return (
    <p>
      {text}...
      <Button onClick={handleClick}>{isExpanded ? "Less" : "More"}</Button>
    </p>
  );
};

export default ExpandableText;
