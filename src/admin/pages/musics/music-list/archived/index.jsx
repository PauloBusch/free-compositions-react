import MusicListBase from '../base';

import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, remove } from '../../../../../reducers/musics/MusicsActions';
import { MUSIC_ARCHIVED } from '../../../../../reducers/musics/MusicStatus';
import Table from '../../../../../common/table/Table';
import { changeStatus } from './../../../../../reducers/musics/MusicsActions';
import { MUSIC_PUBLIC } from './../../../../../reducers/musics/MusicStatus';
import { getRouteWithoutParams } from './../../../../../common/router/index';

class MusicListArchived extends MusicListBase {
  constructor(props) {
    super(props, MUSIC_ARCHIVED);
  }

  restore(music) {
    this.props.changeStatus(music.id, MUSIC_PUBLIC, s => this.afterRestore(s, music));
  }

  afterRestore(success, music) {
    if (success) {
      this.musics = this.musics.filter(l => l.id !== music.id);
      this.forceUpdate();
    }
  }

  goEdit(id) {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/view/${id}`;
    router.push(url);
  }

  configure() {
    super.configure();

    const { user } = this.props;
    this.tableActions = [];
    
    if (user.role === 'Admin'){
      this.tableActions.push({ icon: 'undo-alt', title: 'Restaurar', color: 'green', click: this.restore.bind(this) });
      this.tableActions.push({ icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) });
    }
    
    this.useDrag = user.role === 'Admin';
  }
} 


const mapStateToProps = state => ({ musics: state.musics, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, changeStatus, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListArchived));
