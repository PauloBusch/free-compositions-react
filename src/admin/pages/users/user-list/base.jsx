import React from 'react';
import Modal from '../../../../common/modal/Modal';
import { MUSIC_ARCHIVED } from '../../../../reducers/musics/MusicStatus';

import ListBase from '../../../partials/list-base/ListBase';

export default class UserListBase extends ListBase {
  constructor(props, role) {
    super(props);

    this.role = role;
    this.className = 'page-user-list';
    this.configure();
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 50 },
      { prop: 'email', label: 'Email', flex: 50 }
    ];
  }

  confirmRemove() {
    this.toggleLoadingRemove(true);
    this.props.remove(this.state.selected.id, this.afterRemove);
  }
  
  afterRemove(success) {
    if (!success) {
      this.toggleLoadingRemove(false);
      return;
    }
    this.props.archiveByCompositor(this.state.selected, () => {
      this.toggleLoadingRemove(false);
      this.setState({ 
        ...this.state, 
        selected: null,
        showConfirmRemove: false 
      });
    });
  }

  modal() {
    const modalActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeModal.bind(this) },
      { text: 'REMOVER', pallet: { fill: 'red', text: 'white' }, loading: this.state.loadingRemove, click: this.confirmRemove.bind(this) }
    ];

    return ( 
      <Modal title="Confirmação" 
        actions={ modalActions } show={ this.state.showConfirmRemove } 
        onClose={ this.closeModal }>
        <div>
          Deseja realmente remover o usuário?<br />
          As músicas publicadas serão arquivadas! 
        </div>
      </Modal>
    );
  }
  
  getList() {
    return this.props.users.filter(u => u.role === this.role);
  }
}

