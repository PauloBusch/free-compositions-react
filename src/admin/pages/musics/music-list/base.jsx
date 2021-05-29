import React from 'react';

import ListBase from '../../../partials/list-base/ListBase';
import Resume from './../../../../common/resume/index';
import { extractTextFromHtml } from './../../../../common/api/html';

export default class MusicListBase extends ListBase {
  constructor(props, status) {
    super(props);
    
    this.className = 'tab-music-list';
    this.status = status;
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

  afterRemove(success) {
    if (success) this.musics = this.musics.filter(l => l.id !== this.state.selected.id);
    super.afterRemove(success);
  }

  configure() {
    const { user } = this.props;
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 20 },
      { prop: 'compositors', label: 'Compositores', flex: 20, format: list => list ? list.join(', ') : '' },
      { prop: 'genre', label: 'Gênero', flex: 20 },
      { prop: 'letter', label: 'Resumo', flex: 40, template: props => Resume({ text: extractTextFromHtml(props.row.letter) }) }
    ];
    if (user.role === 'Compositor'){ 
      this.tableColumns = this.tableColumns.filter(c => c.label !== 'Compositores');
      const resumeColumn = this.tableColumns.find(c => c.label === 'Resumo');
      resumeColumn.flex = 60;
    }

    this.sort = 'desc';
  }

  afterUpdateOrder(success) { 
    if (success) {
      const { user } = this.props;
      const filters = { status: this.status };
      if (user.role === 'Compositor') filters.compositor = user.name;
      this.props.getAllByFilter(filters, this.afterLoad);
    }
  }
  
  getList() {
    return this.musics;
  }
}
