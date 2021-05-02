import './overlay-slide.css';

import React from 'react';

export default function OverlaySlide(props) {
  return (
    <div className="template-slide-about-bg">
      <div className="template-slide-about">
        <a href={ props.actionUrl }>{ props.actionLabel }</a>
      </div>
    </div>
  );
}
