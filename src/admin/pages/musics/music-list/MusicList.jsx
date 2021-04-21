import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, getAllByCompositor, updateOrderBulk, remove } from '../../../../reducers/musics/MusicsActions';
import ListBase from '../../../partials/list-base/ListBase';

class MusicList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Músicas';
    this.className = 'page-music-list';
    this.resumeLetter = this.resumeLetter.bind(this);
    this.configure();
  }

  componentWillMount() {
    const { user } = this.props;
    this.toggleLoading(true);
    user.role === 'Compositor' 
      ? this.props.getAllByCompositor(user.name, this.afterLoad)
      : this.props.getAll(this.afterLoad);
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

  configure() {
    const { user } = this.props;
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 20 },
      { prop: 'compositor', label: 'Compositor', flex: 20 },
      { prop: 'genre', label: 'Gênero', flex: 20 },
      { prop: 'letter', label: 'Resumo', flex: 40, template: this.resumeLetter }
    ];
    if (user.role === 'Compositor')
      this.tableColumns = this.tableColumns.filter(c => c.label !== 'Compositor');
    this.sort = 'desc';
  }
  
  getList() {
    return this.props.musics;
  }
}

const mapStateToProps = state => ({ musics: state.musics, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, getAllByCompositor, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicList));
