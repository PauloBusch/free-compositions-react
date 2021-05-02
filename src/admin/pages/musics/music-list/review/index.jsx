
import MusicListBase from './../base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, remove } from '../../../../../reducers/musics/MusicsActions';
import { MUSIC_REVISION } from './../../../../../reducers/musics/MusicStatus';
import { getRouteWithoutParams } from './../../../../../common/router/index';

class MusicListReview extends MusicListBase {
  constructor(props) {
    super(props, MUSIC_REVISION);
  }

  goEdit(id) {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/review/${id}`;
    router.push(url);
  }
} 


const mapStateToProps = state => ({ musics: state.musics, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListReview));
