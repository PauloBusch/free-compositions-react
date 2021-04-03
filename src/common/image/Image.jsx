import './Image.css';
import React from 'react';

export default props => {
  const { image } = props.row;
  return (
    <div className="card-image" style={ { backgroundImage: `url('${image}')` } }></div>
  );
}
