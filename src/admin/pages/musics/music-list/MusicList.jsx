import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import ListBase from '../../../partials/list-base/ListBase';
import { getAllByStatus, updateOrderBulk, remove } from '../../../../reducers/musics/MusicsActions';
import { MUSIC_PENDING, MUSIC_PUBLIC } from '../../../../reducers/musics/MusicStatus';

class MusicList extends ListBase {
  constructor(props) {
    super(props);

    this.className = 'tab-music-list';
    this.status = this.props.status || MUSIC_PUBLIC;
    this.resumeLetter = this.resumeLetter.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.configure();
  }

  componentWillMount() {
    this.toggleLoading(true);
    this.props.getAllByStatus(this.status, this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.musics = list;
      this.toggleLoading(false);
    }
  }

  confirmRemove() {
    this.toggleLoadingRemove(true);
    this.props.remove(this.state.selected, this.afterRemove);
  }

  resumeLetter(props) {
    const { letter } = props.row;
    const limit = 180;
    if (!letter) return false;
    if (letter.length > limit) 
      return <span>{letter.substr(0, limit - 3)}...</span>;
    return <span>{letter}</span>;
  }

  getStatus(status) {
    if (status === MUSIC_PUBLIC) return 'Público';
    if (status === MUSIC_PENDING) return 'Avaliação';
  }

  configure() {
    const { user } = this.props;
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 20 },
      { prop: 'compositor', label: 'Compositor', flex: 20 },
      { prop: 'status', label: 'Status', flex: 20, format: this.getStatus },
      { prop: 'genre', label: 'Gênero', flex: 20 },
      { prop: 'letter', label: 'Resumo', flex: 40, template: this.resumeLetter }
    ];
    if (user.role === 'Compositor')
      this.tableColumns = this.tableColumns.filter(c => c.label !== 'Compositor');
    else 
      this.tableColumns = this.tableColumns.filter(c => c.label !== 'Status');

    this.sort = 'desc';
  }
  
  getList() {
    return this.musics;
  }
}

const mapStateToProps = state => ({ musics: state.musics, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByStatus, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicList));
