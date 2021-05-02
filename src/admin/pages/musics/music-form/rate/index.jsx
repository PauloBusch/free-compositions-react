
import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MusicFormBase from '../base';

import required from '../../../../../common/validators/required';
import TextArea from '../../../../../common/fields/textarea/TextArea';
import { create, update, loadForm, submitForm } from '../../../../../reducers/musics/MusicsActions';
import { getAll as getGenresAll } from '../../../../../reducers/genres/GenresActions';
import { getAll as getUsersAll } from '../../../../../reducers/users/UsersActions';
import { getAll as getStylesAll } from '../../../../../reducers/styles/StylesActions';
import { getAll as getPlaylistAll } from '../../../../../reducers/playlists/PlaylistsActions';
import SubmitButton from '../../../../../common/buttons/submit/SubmitButton';
import Modal from '../../../../../common/modal/Modal';
import { MUSIC_REVISION } from '../../../../../reducers/musics/MusicStatus';
import { MUSIC_PUBLIC } from './../../../../../reducers/musics/MusicStatus';

class MusicFormRate extends MusicFormBase {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.reject = this.reject.bind(this);
    this.publicate = this.publicate.bind(this);
    this.justifyReject = this.justifyReject.bind(this);
    this.closeInputRejectJustificationModal = this.closeInputRejectJustificationModal.bind(this);
  }

  getTitle() {
    return `Avaliação de ${this.title}`;
  }

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/rate/;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  form() {
    const { handleSubmit } = this.props;

    const modalActions = [
      { text: 'REJEITAR', pallet: { fill: 'red', text: 'white' }, loading: this.state.saveLoading, click: this.reject }
    ];

    return (
      <Form id="music-form" onSubmit={ handleSubmit(this.submit) }>
        { this.fields() }
        <Modal title="Rejeitar Música" 
          actions={ modalActions } show={ this.state.showInputRejectJustification } 
          onClose={ this.closeInputRejectJustificationModal }>
          { this.state.showInputRejectJustification && <Field name="rejectJustification" label="Justificativa" flex="100" 
            component={ TextArea } validate={ required }/> }
        </Modal>
      </Form>
    );
  }

  buttons() {
    return (
      <div className="music-buttons">
        <SubmitButton text="REJEITAR" backgroundColor="red" loading={ this.state.saveLoading && this.setStatus == MUSIC_REVISION } onClick={ this.justifyReject }/>
        <SubmitButton text="PUBLICAR" loading={ this.state.saveLoading && this.setStatus == MUSIC_PUBLIC } onClick={ this.publicate }/>
      </div>
    );
  }

  justifyReject() {
    this.setState({
      ...this.state,
      showInputRejectJustification: true
    });
  }

  closeInputRejectJustificationModal() {
    this.setState({ ...this.state, showInputRejectJustification: false });
  }

  publicate() {
    this.setStatus = MUSIC_PUBLIC;
    this.props.submitForm();
  }

  reject() {
    this.setStatus = MUSIC_REVISION;
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

const musicForm = reduxForm({ form: 'music-form' })(withRouter(MusicFormRate));
const mapStateToProps = state => ({ user: state.auth.user, genres: state.genres, users: state.users, styles: state.styles, playlists: state.playlists });
const mapDispatchToProps = dispatch => bindActionCreators({ getGenresAll, getUsersAll, getStylesAll, getPlaylistAll, create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(musicForm);
