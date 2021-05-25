
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
import { MUSIC_PENDING } from '../../../../../reducers/musics/MusicStatus';
import SubmitButton from '../../../../../common/buttons/submit/SubmitButton';
import Modal from '../../../../../common/modal/Modal';

class MusicFormReview extends MusicFormBase {
  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
    this.submit = this.submit.bind(this);
    this.closeRejectJustificationModal = this.closeRejectJustificationModal.bind(this);
  }

  getTitle() {
    return `Revisão de ${this.title}`;
  }

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/review\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  afterLoad(success) {
    if (success) {
      this.setState({ 
        ...this.state, 
        loading: false,
        showRejectJustification: !!this.props.rejectJustification
      });
    }
  }

  form() {
    const { handleSubmit } = this.props;

    return (
      <Form id="music-form" onSubmit={ handleSubmit(this.submit) }>
        { this.fields() }
        <Modal title="Motivo da Rejeição" show={ this.state.showRejectJustification } 
          onClose={ this.closeRejectJustificationModal }>
          { this.props.rejectJustification }
        </Modal>
      </Form>
    );
  }

  buttons() {
    return <SubmitButton text="ENVIAR" loading={ this.state.saveLoading } onClick={ this.send }/>
  }

  closeRejectJustificationModal() {
    this.setState({ ...this.state, showRejectJustification: false });
  }

  send() {
    this.setStatus = MUSIC_PENDING;
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

const musicForm = reduxForm({ form: 'music-form' })(withRouter(MusicFormReview));
const selector = formValueSelector('music-form');
const mapStateToProps = state => ({ 
  user: state.auth.user, genres: state.genres, users: state.users, 
  styles: state.styles, playlists: state.playlists,
  rejectJustification: selector(state, 'rejectJustification') 
});
const mapDispatchToProps = dispatch => bindActionCreators({ getGenresAll, getUsersAll, getStylesAll, getPlaylistAll, create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(musicForm);
