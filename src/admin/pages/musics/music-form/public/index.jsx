
import React from 'react';
import { withRouter } from 'react-router';
import { Form, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MusicFormBase from '../base';

import { create, update, loadForm, submitForm } from '../../../../../reducers/musics/MusicsActions';
import { getAll as getGenresAll } from '../../../../../reducers/genres/GenresActions';
import { getAll as getUsersAll } from '../../../../../reducers/users/UsersActions';
import { getAll as getStylesAll } from '../../../../../reducers/styles/StylesActions';
import { getAll as getPlaylistAll } from '../../../../../reducers/playlists/PlaylistsActions';
import SubmitButton from '../../../../../common/buttons/submit/SubmitButton';
import Modal from '../../../../../common/modal/Modal';
import { MUSIC_PENDING, MUSIC_PUBLIC } from './../../../../../reducers/musics/MusicStatus';

class MusicForm extends MusicFormBase {
  constructor(props) {
    super(props);

    this.beforeSubmit = this.beforeSubmit.bind(this);
    this.sendPending = this.sendPending.bind(this);
    this.modalConfirmSendPending = this.modalConfirmSendPending.bind(this);
    this.closeConfirmSendPending = this.closeConfirmSendPending.bind(this);
  }

  getTitle() {
    if (this.id)
      return `Edição de ${this.title}`;
    
    return `Cadastro de ${this.title}`;
  }

  form() {
    const { handleSubmit } = this.props;

    return (
      <Form id="music-form" onSubmit={ handleSubmit(this.submit) }>
        { this.fields() }
        { this.modalConfirmSendPending() }
      </Form>
    );
  }

  buttons() {
    return <SubmitButton text="SALVAR" loading={ this.state.saveLoading } onClick={ this.beforeSubmit }/>
  }

  needConfirmSendPending() {
    const { user, status } = this.props;
    return user.role === 'Compositor' && this.id && status === MUSIC_PUBLIC;
  }

  modalConfirmSendPending() {
    if (!this.needConfirmSendPending()) return false;

    const modalActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeConfirmSendPending },
      { text: 'CONFIRMAR', pallet: { fill: '#0276cd', text: 'white' }, click: this.sendPending }
    ];

    return (
      <Modal title="Enviar para Avaliação" 
        actions={ modalActions } show={ this.state.showConfirmSendPending } 
        onClose={ this.closeConfirmSendPending }>
        <div>
          A música precisará ser avaliada por um administrador e ficará indisponível no site.<br />
          Confirma o envio da música para avaliação?
        </div>
      </Modal>
    );
  }

  sendPending() {
    this.setStatus = MUSIC_PENDING;
    this.props.submitForm();
  }

  closeConfirmSendPending() {
    this.setState({
      ...this.state,
      showConfirmSendPending: false
    });
  }

  beforeSubmit() {
    if (this.needConfirmSendPending()) {
      this.setState({
        ...this.state,
        showConfirmSendPending: true
      });
      return;
    }
    this.props.submitForm();
  }

  submit(values) {
    if (this.setStatus) values.status = this.setStatus;
    this.toggleSaveLoading(true);
    if (this.id)
      this.props.update(values, this.afterSubmit);
    else
      this.props.create(values, this.afterSubmit);
  }
}

const musicForm = reduxForm({ form: 'music-form' })(withRouter(MusicForm));
const selector = formValueSelector('music-form');
const mapStateToProps = state => ({ 
  user: state.auth.user, genres: state.genres, users: state.users, 
  styles: state.styles, playlists: state.playlists,
  status: selector(state, 'status') 
});
const mapDispatchToProps = dispatch => bindActionCreators({ getGenresAll, getUsersAll, getStylesAll, getPlaylistAll, create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(musicForm);
