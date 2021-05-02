
import MusicListBase from './../base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, updateOrderBulk, remove } from '../../../../../reducers/musics/MusicsActions';
import { MUSIC_ARCHIVED, MUSIC_PUBLIC } from '../../../../../reducers/musics/MusicStatus';
import { getRouteWithoutParams } from './../../../../../common/router/index';
import { changeStatus } from './../../../../../reducers/musics/MusicsActions';

class MusicListPublic extends MusicListBase {
  goEdit(id) {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/edit/${id}`;
    router.push(url);
  }

  archive(music) {
    this.props.changeStatus(music.id, MUSIC_ARCHIVED, s => this.afterAchive(s, music));
  }

  afterAchive(success, music) {
    if (success) {
      this.musics = this.musics.filter(l => l.id !== music.id);
      this.forceUpdate();
    }
  }

  configure() {
    super.configure();

    const { user } = this.props;
    this.tableActions = [];
    if (user.role === 'Compositor')
      this.tableActions.push({ icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) });

    if (user.role === 'Admin')
      this.tableActions.push({ icon: 'archive', title: 'Arquivar', color: 'orange', click: this.archive.bind(this) });

    this.useDrag = user.role === 'Admin';
  }

  constructor(props) {
    super(props, MUSIC_PUBLIC);
  }
} 


const mapStateToProps = state => ({ musics: state.musics, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, changeStatus, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListPublic));
