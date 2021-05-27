import React from 'react';

const Label = props => {
  const { name, className } = props;
  return <span className={`label ${className}`}>{name}</span>;
};

export const Required = () => <Label name="Required" className="required" />;

export default Label;
