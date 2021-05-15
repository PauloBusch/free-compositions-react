
import MusicListBase from '../base';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import { getAllByFilter, changeStatus, update, remove } from '../../../../../reducers/musics/MusicsActions';
import { MUSIC_SHARED, MUSIC_PUBLIC } from './../../../../../reducers/musics/MusicStatus';
import { WEBSITE_URL } from './../../../../../consts';
import { copyToClipboard } from './../../../../../common/api/clipboard';
import Input from './../../../../../common/fields/input/Input';
import Modal from '../../../../../common/modal/Modal';
import required from './../../../../../common/validators/required';
import integer from './../../../../../common/validators/number/integer';
import oneOrMore from './../../../../../common/validators/number/one-or-more';
import { toTitleCase } from './../../../../../common/api/string';
import { Field, Form, reduxForm, formValueSelector, change } from 'redux-form';

class MusicListShared extends MusicListBase {
  constructor(props) {
    super(props, MUSIC_SHARED);

    this.public = this.public.bind(this);
    this.copyLink = this.copyLink.bind(this);
    this.extendExpiration = this.extendExpiration.bind(this);
    this.formatExpiration = this.formatExpiration.bind(this);
    this.openShareModal = this.openShareModal.bind(this);
    this.openLinkModal = this.openLinkModal.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.closeLinkModal = this.closeLinkModal.bind(this);
    this.toggleSaveLoading = this.toggleSaveLoading.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
    this.renew = this.renew.bind(this);
  }

  public(music) {
    this.props.changeStatus(music.id, MUSIC_PUBLIC, s => this.afterChangedStatus(s, music));
  }

  afterChangedStatus(success, music) {
    if (success) {
      this.musics = this.musics.filter(l => l.id !== music.id);
      this.forceUpdate();
    }
  }

  copyLink(music) {
    const link = this.generateLink(music);
    copyToClipboard(link);
  }

  extendExpiration(music) {
    this.openShareModal(music);
  }

  generateLink(music) {
    return `${WEBSITE_URL}/${music.id}`;
  }

  formatExpiration(date) {
    if (!date) return;
    const now = moment();
    if (moment(date).isSameOrBefore(now)) return 'Expirado';
    return toTitleCase(moment.duration(moment(date).diff(now)).humanize());
  }

  configure() {
    super.configure();

    this.tableColumns = this.tableColumns.filter(c => c.label !== 'Resumo');
    this.tableColumns.push({ prop: 'expirationLink', label: 'Validade', flex: 40, format: this.formatExpiration });

    this.tableActions = [
      { icon: 'link', title: 'Copiar Link', color: 'var(--primary)', click: this.copyLink },
      { icon: 'clock', title: 'Renovar', color: 'green', click: this.extendExpiration },
      { icon: 'undo', title: 'Publicar', color: 'orange', click: this.public }
    ];
  }

  modal() {
    return [
      super.modal(),
      this.modalWithForm()
    ];
  }

  modalWithForm() {
    return (
      <Form onSubmit={ () => { } } key="form">
        { this.modalShare() }
        { this.modalLink() }
      </Form>
    );
  }

  modalShare() {
    const modalActions = [
      { text: 'RENOVAR', loading: this.state.saveLoading, click: this.renew }
    ];

    return (
      <Modal title="Renovar Link" maxWidth="500px"
        actions={ modalActions } show={ this.state.showShareModal } 
        onClose={ this.closeShareModal }>
          { this.state.showShareModal && <Field name="shareDays" label="Duração em dias"
            component={ Input } validate={ [required, integer, oneOrMore] }/> }
      </Modal>
    );
  }

  modalLink() {
    return (
      <Modal title="Renovar Link" maxWidth="500px"
        show={ this.state.showLinkModal } onClose={ this.closeLinkModal }>
          { this.state.showLinkModal && <Field name="shareLink" value="teste" 
            component={ Input } copyClipboard readOnly={ true }/> }
      </Modal>
    );
  }

  renew() {
    const values = {
      id: this.state.selected.id,
      expirationLink: moment().add(this.props.shareDays, 'day').toDate()
    };
    this.toggleSaveLoading(true);
    this.props.update(values, this.afterSubmit);
  } 

  afterSubmit(success) {
    this.toggleSaveLoading(false);
    if (success) {
      this.closeShareModal();
      return this.openLinkModal();
    }
  }

  toggleSaveLoading(loading) {
    this.setState({ 
      ...this.state, 
      saveLoading: loading
    });
  }
  
  openShareModal(music) {
    this.setState({
      ...this.state,
      selected: music,
      showShareModal: true
    });
  }

  openLinkModal() {
    const musicLink = `${WEBSITE_URL}/${this.state.selected.id}`;
    this.props.dispatch(change('modal-form', 'shareLink', musicLink));
    this.setState({
      ...this.state,
      showLinkModal: true
    });
  }

  closeShareModal() {
    this.setState({ ...this.state, showShareModal: false });
  }

  closeLinkModal() {
    this.setState({ ...this.state, selected: null, loading: true, showLinkModal: false });
    
    const filters = { status: this.status };
    this.props.getAllByFilter(filters, this.afterLoad);
  }
} 

const musicListShared = reduxForm({ form: 'modal-form' })(withRouter(MusicListShared));
const selector = formValueSelector('modal-form');
const mapStateToProps = state => ({ 
  initialValues: { shareDays: 7 }, 
  shareDays: selector(state, 'shareDays'),
  musics: state.musics, user: state.auth.user 
});
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, changeStatus, update, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(musicListShared);
