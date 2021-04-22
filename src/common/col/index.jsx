import React from 'react';

function getStyle(props) {
  const { flex, px } = props;
  if (px) return { witdth: `${px}px` };
  if (flex) return { flexBasis: `${flex}%` };
  return { }; 
}

export default function Col(props) {
  return (
    <div className="grid-col" style={ getStyle(props) }>
      { props.children }
    </div>
  );
}
