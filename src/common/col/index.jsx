import React from 'react';

function getStyle(props) {
  const { flex, px } = props;
  const style = props.style || { };
  if (px) style.width = `${px}px`;
  if (flex) style.flexBasis = `${flex}%`;
  return style; 
}

export default function Col(props) {
  return (
    <div className={ `grid-col ${props.className || ''}` } style={ getStyle(props) }>
      { props.children }
    </div>
  );
}
