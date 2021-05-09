
import MusicListBase from '../base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, changeStatus, remove } from '../../../../../reducers/musics/MusicsActions';
import { MUSIC_SOLD, MUSIC_PUBLIC } from './../../../../../reducers/musics/MusicStatus';
import { getRouteWithoutParams } from './../../../../../common/router/index';

class MusicListSold extends MusicListBase {
  constructor(props) {
    super(props, MUSIC_SOLD);

    this.public = this.public.bind(this);
  }

  goEdit(id) {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/view/${id}`;
    router.push(url);
  }

  public(music) {
    this.props.changeStatus(music.id, MUSIC_PUBLIC, s => this.afterChangedStatus(s, music));
  }

  afterChangedStatus(success, music) {
    if (success) {
      this.musics = this.musics.filter(l => l.id !== music.id);
      this.forceUpdate();
    }
  }

  configure() {
    super.configure();

    const { user } = this.props;
    this.tableActions = [];
    
    if (user.role === 'Admin'){
      this.tableActions.push({ icon: 'undo', title: 'Publicar', color: 'orange', click: this.public });
    }
  }
} 


const mapStateToProps = state => ({ musics: state.musics, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, changeStatus, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListSold));
