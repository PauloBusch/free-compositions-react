
import MusicListBase from '../base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, remove } from '../../../../../reducers/musics/MusicsActions';
import { MUSIC_SOLD } from './../../../../../reducers/musics/MusicStatus';
import { getRouteWithoutParams } from './../../../../../common/router/index';

class MusicListSold extends MusicListBase {
  constructor(props) {
    super(props, MUSIC_SOLD);
  }

  goEdit(id) {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/view/${id}`;
    router.push(url);
  }

  configure() {
    super.configure();
    this.tableActions = [];
  }
} 


const mapStateToProps = state => ({ musics: state.musics, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListSold));
