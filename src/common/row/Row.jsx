import './Row.css';

import React from 'react';

function getStyle(props) {
  const style = { };
  if (props.justify) style.justifyContent = props.justify;
  if (props.height) style.height = props.height;
  return style;
}

export default function Row(props){
  return (
    <div className={ `grid-row ${props.className || ''}` } style={ getStyle(props) }>
      { props.children }
    </div>
  );
}
