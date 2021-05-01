import React from 'react';

import ListBase from '../../../partials/list-base/ListBase';

export default class MusicListBase extends ListBase {
  constructor(props, status) {
    super(props);
    
    this.className = 'tab-music-list';
    this.status = status;
    this.resumeLetter = this.resumeLetter.bind(this);
    this.configure();
  }

  componentWillMount() {
    this.toggleLoading(true);
    const { user } = this.props;
    const filters = { status: this.status };
    if (user.role === 'Compositor') filters.compositor = user.name;
    this.props.getAllByFilter(filters, this.afterLoad);
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
    return this.musics;
  }
}
