import '../../CardBase.css';
import './Music.css';

import React from 'react';
import { getYoutubeLink } from '../../../../../common/api/youtube';

export default props => {
  const { data } = props;

  return (
    <div className="card music">
      <iframe className="img" src={ getYoutubeLink(data.url) }/>
    </div>
  );  
}
