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

class MusicListArchived extends MusicListBase {
  constructor(props) {
    super(props, MUSIC_ARCHIVED);
  }

  table() {
    const list = this.getList();
    
    const tablePallet = {
      text: 'black',
      fill: '#a7d2ff'
    };

    return (
      <Table loading={ this.state.loading } pallet={ tablePallet } rows={ list }
        columns={ this.tableColumns } actions={ this.tableActions } 
      />
    );
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
