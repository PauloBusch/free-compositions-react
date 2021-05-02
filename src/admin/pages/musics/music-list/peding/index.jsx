
import MusicListBase from '../base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, remove } from '../../../../../reducers/musics/MusicsActions';
import { MUSIC_PENDING } from '../../../../../reducers/musics/MusicStatus';
import { getRouteWithoutParams } from './../../../../../common/router/index';

class MusicListPending extends MusicListBase {
  constructor(props) {
    super(props, MUSIC_PENDING);
  }

  goEdit(id) {
    const { router, user } = this.props;
    const route = user.role === 'Admin' ? 'rate' : 'edit';
    const url = `${getRouteWithoutParams(router)}/${route}/${id}`;
    router.push(url);
  }

  configure() {
    super.configure();
    const { user } = this.props;
    this.tableActions = [];
    if (user.role === 'Compositor')
      this.tableActions.push({ icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) });
  }
} 


const mapStateToProps = state => ({ musics: state.musics, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListPending));
