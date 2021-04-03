import './MusicList.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import Card from '../../../partials/card/Card';
import CardContent from '../../../partials/card/card-content/CardContent';
import CardHeader from '../../../partials/card/card-header/CardHeader';
import Table from './../../../../common/table/Table';
import Modal from '../../../../common/modal/Modal';
import FixedButton from '../../../../common/buttons/fixed/FixedButton';
import image from '../../../../common/image/Image';
import { getAll, remove } from '../../../../reducers/musics/MusicsActions';

const INITIAL_STATE = { selected: null, showConfirmRemove: false };

class MusicList extends Component {
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

  render() {
    const modalActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeModal.bind(this) },
      { text: 'REMOVER', pallet: { fill: 'red', text: 'white' }, click: this.confirmRemove.bind(this) }
    ];
    const tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    const tableColumns = [
      { prop: 'image', label: 'Capa', flex: 5, template: image },
      { prop: 'name', label: 'Nome', flex: 40 },
      { prop: 'compositor', label: 'Compositor', flex: 40 }
    ];
    const tablePallet = {
      text: 'black',
      fill: '#007bff57'
    };
    const { musics } = this.props;
    return (
      <div className="page-music-list">
        <Card>
          <CardHeader>
            <h2>Músicas</h2>
          </CardHeader>
          <CardContent padding="0">
            <Table rowClick={ row => this.goEdit(row.id) }
              pallet={ tablePallet } rows={ musics }
              columns={ tableColumns } actions={ tableActions } 
            />
          </CardContent>
        </Card>
        <Modal title="Confirmação" 
          actions={ modalActions } show={ this.state.showConfirmRemove } 
          onClose={ this.closeModal }
        >
          Deseja realmente remover a música?
        </Modal>
        <FixedButton title="Cadastrar" onClick={ this.goNew } icon="plus" color="var(--primary)"/>
      </div>
    );    
  }
}

const mapStateToProps = state => ({ musics: state.musics });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicList));
