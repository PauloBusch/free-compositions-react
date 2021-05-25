
import React from 'react';
import { withRouter } from 'react-router';
import { change, Field, Form, reduxForm, unregisterField, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import MusicFormBase from '../base';

import { create, update, loadForm, submitForm } from '../../../../../reducers/musics/MusicsActions';
import { getAll as getGenresAll } from '../../../../../reducers/genres/GenresActions';
import { getAll as getUsersAll } from '../../../../../reducers/users/UsersActions';
import { getAll as getStylesAll } from '../../../../../reducers/styles/StylesActions';
import { getAll as getPlaylistAll } from '../../../../../reducers/playlists/PlaylistsActions';
import { MUSIC_REVISION } from '../../../../../reducers/musics/MusicStatus';
import { MUSIC_PUBLIC, MUSIC_SHARED } from './../../../../../reducers/musics/MusicStatus';
import TextArea from '../../../../../common/fields/textarea/TextArea';
import required from '../../../../../common/validators/required';
import SubmitButton from '../../../../../common/buttons/submit/SubmitButton';
import oneOrMore from './../../../../../common/validators/number/one-or-more';
import integer from './../../../../../common/validators/number/integer';
import Modal from '../../../../../common/modal/Modal';
import Input from './../../../../../common/fields/input/Input';
import { WEBSITE_URL } from './../../../../../consts';

class MusicFormRate extends MusicFormBase {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.reject = this.reject.bind(this);
    this.publicate = this.publicate.bind(this);
    this.justifyReject = this.justifyReject.bind(this);
    this.closeInputRejectJustificationModal = this.closeInputRejectJustificationModal.bind(this);
    this.openShareModal = this.openShareModal.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.openLinkModal = this.openLinkModal.bind(this);
    this.closeLinkModal = this.closeLinkModal.bind(this);
    this.share = this.share.bind(this);
  }

  getTitle() {
    return `Avaliação de ${this.title}`;
  }

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/rate\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  form() {
    const { handleSubmit } = this.props;

    return (
      <Form id="music-form" onSubmit={ handleSubmit(this.submit) }>
        { this.fields() }
        { this.modalShare() }
        { this.modalLink() }
        { this.modalReject() }
      </Form>
    );
  }

  buttons() {
    return (
      <div className="music-buttons">
        <SubmitButton text="REJEITAR" backgroundColor="red" loading={ this.state.saveLoading && this.setStatus == MUSIC_REVISION } onClick={ this.justifyReject }/>
        <SubmitButton text="COMPARTILHAR" loading={ this.state.saveLoading && this.setStatus == MUSIC_SHARED } onClick={ this.openShareModal }/>
        <SubmitButton text="PUBLICAR" loading={ this.state.saveLoading && this.setStatus == MUSIC_PUBLIC } onClick={ this.publicate }/>
      </div>
    );
  }

  modalReject() {
    const modalActions = [
      { text: 'REJEITAR', pallet: { fill: 'red', text: 'white' }, loading: this.state.saveLoading, click: this.reject }
    ];

    return (
      <Modal title="Rejeitar Música" 
        actions={ modalActions } show={ this.state.showInputRejectJustification } 
        onClose={ this.closeInputRejectJustificationModal }>
        { this.state.showInputRejectJustification && <Field name="rejectJustification" label="Justificativa" flex="100" 
          component={ TextArea } validate={ required }/> }
      </Modal>
    );
  }

  modalShare() {
    const modalActions = [
      { text: 'COMPARTILHAR', loading: this.state.saveLoading, click: this.share }
    ];

    return (
      <Modal title="Compartilhar Música" maxWidth="500px"
        actions={ modalActions } show={ this.state.showShareModal } 
        onClose={ this.closeShareModal }>
          <div>
            { this.state.showShareModal && <Field name="shareDays" label="Duração em dias"
              component={ Input } validate={ [required, integer, oneOrMore] }/> }
          </div>
      </Modal>
    );
  }

  modalLink() {
    return (
      <Modal title="Compartilhar Música" maxWidth="500px"
        show={ this.state.showLinkModal } onClose={ this.closeLinkModal }>
          <div>
            { this.state.showLinkModal && <Field name="shareLink"
              orientation="A música firacá indisponível no site e será acessível apenas pelo link até que expire!"
              component={ Input } copyClipboard readOnly={ true }/> }
          </div>
      </Modal>
    );
  }

  openShareModal() {
    this.props.dispatch(change('music-form', 'shareDays', 7));
    this.setState({
      ...this.state,
      showShareModal: true
    });
  }

  openLinkModal() {
    this.props.dispatch(change('music-form', 'shareLink', `${WEBSITE_URL}/#/music/preview/${this.id}`));
    this.setState({
      ...this.state,
      showLinkModal: true
    });
  }

  closeLinkModal() {
    this.setState({ ...this.state, showLinkModal: false });
    this.goBack();
  }

  closeShareModal() {
    this.setState({ ...this.state, showShareModal: false });
  }

  share() {
    this.setStatus = MUSIC_SHARED;
    this.setExpirationLink = moment().add(this.props.shareDays, 'day').toDate();
    this.props.submitForm();
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
    if (this.setExpirationLink) {
      delete values.shareDays;
      values.expirationLink = this.setExpirationLink;
    }
    this.toggleSaveLoading(true);
    if (this.id)
      this.props.update(values, this.afterSubmit);
    else
      this.props.create(values, this.afterSubmit);
  }
    
  afterSubmit(success) {
    this.toggleSaveLoading(false);
    if (success) {
      if (this.setExpirationLink) {
        this.closeShareModal();
        return this.openLinkModal();
      }
      this.goBack();
    }
  }
}

const musicForm = reduxForm({ form: 'music-form' })(withRouter(MusicFormRate));
const selector = formValueSelector('music-form');
const mapStateToProps = state => ({ 
  user: state.auth.user, genres: state.genres, users: state.users, styles: state.styles, playlists: state.playlists,
  shareDays: selector(state, 'shareDays')
});
const mapDispatchToProps = dispatch => bindActionCreators({ getGenresAll, getUsersAll, getStylesAll, getPlaylistAll, create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(musicForm);
