import React from 'react';
import Modal from '../../../../common/modal/Modal';

import ListBase from '../../../partials/list-base/ListBase';

export default class UserListBase extends ListBase {
  constructor(props, role) {
    super(props);

    this.role = role;
    this.className = 'page-user-list';
    this.configure();
    this.continue = this.continue.bind(this);
    this.closeContinueModal = this.closeContinueModal.bind(this);
    this.state = { ...this.state, showContinueRemove: false };
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.continue.bind(this) }
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
    const modalContinueActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeContinueModal.bind(this) },
      { text: 'CONTINUAR', pallet: { fill: 'red', text: 'white' }, click: this.remove.bind(this) }
    ];
    const modalRemoveActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeModal.bind(this) },
      { text: 'REMOVER', pallet: { fill: 'red', text: 'white' }, loading: this.state.loadingRemove, click: this.confirmRemove.bind(this) }
    ];

    return ( 
      <div>
        <Modal title="Confirmação"    
          actions={ modalContinueActions } show={ this.state.showContinueRemove } 
          onClose={ this.closeContinueModal }>
          Dopois que o usuário for excluído não será possível utilizar o mesmo email!<br />
          Deseja continuar com a remoção?
        </Modal>
        <Modal title="Confirmação"    
          actions={ modalRemoveActions } show={ this.state.showConfirmRemove } 
          onClose={ this.closeModal }>
          Deseja realmente remover o registro?
        </Modal>
      </div>
    );
  }

  continue(user) {
    this.setState({ ...this.state, 
      selected: user,
      showContinueRemove: true
    });
  }

  remove() {
    this.setState({ ...this.state, 
      showContinueRemove: false,
      showConfirmRemove: true
    });
  }

  closeContinueModal() {
    this.setState({ ...this.state, showContinueRemove: false });
  }
  
  getList() {
    return this.props.users.filter(u => u.role === this.role);
  }
}

