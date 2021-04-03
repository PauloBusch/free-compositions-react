import './ListBase.css';

import React, { Component } from 'react';

import Card from '../card/Card';
import CardContent from '../card/card-content/CardContent';
import CardHeader from '../card/card-header/CardHeader';

import Table from './../../../common/table/Table';
import Modal from '../../../common/modal/Modal';
import FixedButton from '../../../common/buttons/fixed/FixedButton';

const INITIAL_STATE = { selected: null, showConfirmRemove: false };

export default class ListBase extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.closeModal = this.closeModal.bind(this);
    this.goEdit = this.goEdit.bind(this);
    this.goNew = this.goNew.bind(this);
  }

  componentWillMount() {
    this.props.getAll();
  }

  confirmRemove() {
    this.props.remove(this.state.selected._id);
    this.setState({ ...this.state, 
      selected: null,
      showConfirmRemove: false 
    });
  }

  closeModal() {
    this.setState({ ...this.state, showConfirmRemove: false });
  }

  remove(slide) {
    this.setState({ ...this.state, 
      selected: slide,
      showConfirmRemove: true
    });
  }

  goEdit(id) {
    const { router } = this.props;
    const url = `${router.location.pathname}/edit/${id}`;
    this.props.router.push(url);
  }

  goNew() {
    const { router } = this.props;
    const url = `${router.location.pathname}/new`;
    this.props.router.push(url);
  }

  configure() { }
  
  getList() { }

  render() {
    this.configure();
    const list = this.getList();
    const modalActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeModal.bind(this) },
      { text: 'REMOVER', pallet: { fill: 'red', text: 'white' }, click: this.confirmRemove.bind(this) }
    ];
    return (
      <div className={ `list ${this.className ? this.className : ''}` }>
        <Card>
          <CardHeader>
            <h2>{ this.title }</h2>
          </CardHeader>
          <CardContent padding="0">
            <Table rowClick={ row => this.goEdit(row.id) }
              pallet={ this.tablePallet } rows={ list }
              columns={ this.tableColumns } actions={ this.tableActions } 
            />
          </CardContent>
        </Card>
        <Modal title="Confirmação" 
          actions={ modalActions } show={ this.state.showConfirmRemove } 
          onClose={ this.closeModal }
        >
          Deseja realmente remover o registro?
        </Modal>
        <FixedButton title="Cadastrar" onClick={ this.goNew } icon="plus" color="var(--primary)"/>
      </div>
    );    
  }
}
