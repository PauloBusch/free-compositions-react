import './Empty.css';

import React from 'react';

export default props => {
  const message = props.message || 'Nenhum registro encontrado';

  return (
    <div className="table-empty">
      <i className="fas fa-comment"></i>
      { message }
    </div>
  );
}
