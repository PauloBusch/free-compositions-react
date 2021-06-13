import './card-footer.css';

import React from 'react';

export default function CardFooter(props) {
  if (!props.children) return false;
  
  return (
    <div className="page-card-footer">
      { props.children }
    </div>
  );
}
