import './biography.css';

import React from 'react';

import { withRouter, hashHistory } from 'react-router';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { submitForm, loadForm, update } from '../../../reducers/users/UserBiographyActions';
import { logout } from '../../../reducers/auth/AuthActions';
import { remove } from '../../../reducers/users/UsersActions';
import { archiveByCompositor } from '../../../reducers/musics/MusicsActions';
import required from '../../../common/validators/required';
import Row from '../../../common/row/Row';
import FormBase from '../../../common/form/FormBase';
import Input from '../../../common/fields/input/Input';
import TextArea from '../../../common/fields/textarea/TextArea';
import Col from '../../../common/col/index';
import Image from '../../../common/fields/image/index';
import Modal from '../../../common/modal/Modal';
import { MUSIC_ARCHIVED } from '../../../reducers/musics/MusicStatus';
import SubmitButton from '../../../common/buttons/submit/SubmitButton';

const DEFAULT_STATE = {
  name: '',
  birthDate: null
};

class BiographyForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }

    this.state = { ...this.state, removeLoading: false, showModal: false };
    this.closeModal = this.closeModal.bind(this);
    this.closeModalRemove = this.closeModalRemove.bind(this);
    this.afterRemove = this.afterRemove.bind(this);
    this.remove = this.remove.bind(this);
  }

  afterLoad(success, user) {
    if (success) {
      this.setState({ 
        ...this.state, 
        user: user,
        loading: false,
        showModal: !user.biography
      });
    }
  }

  getTitle() {
    return 'Biografia';
  }

  getId() {
    return this.props.user.id;
  }

  submit(values) {
    this.toggleSaveLoading(true);
    this.props.update(values, this.afterSubmit);
  }

  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  form() {
    const { handleSubmit, imageUrl } = this.props;

    return (
      <Form id="biography-form" onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Col flex="30">
            <Row height="100%" justify="flex-start">
              <Field name="image" className="image-field" label="Foto" flex="100"
                imageDefault="images/users/default-avatar.png"
                imageUrl={ imageUrl } component={ Image }
              />
            </Row>
          </Col>
          <Col flex="70">
            <Row justify="flex-start">
              <Field name="name" type="text" label="Nome Completo" placeholder="Informe o nome completo"
                flex="50" component={ Input } validate={ required }
              />
              <Field name="birthDate" type="date" label="Data de Nascimento"
                flex="50" component={ Input } validate={ required }
              />
            </Row>
            <Row justify="flex-start">
              <Field name="biography" label="Resumo da Carreira Musical" placeholder="Informe um resumo"
                flex="100" rows="10" component={ TextArea } validate={ required }
              />
            </Row>
          </Col>
        </Row>
        { this.modalUpdate() }
        { this.modalRemove() }
      </Form>
    );
  }

  modalUpdate() {
    const modalActions = [
      { text: 'OK', pallet: { fill: '#0276cd', text: 'white' }, click: this.closeModal }
    ];

    return (
      <Modal title="Atualização das Informações Bibliográficas" 
        actions={ modalActions } show={ this.state.showModal } 
        onClose={ this.closeModal }>
        <p>Seja bem vindo!</p>
        <p>Este é o painel administrativo destinado aos Compositores.</p>
        <p>Primeiro atualize as informações biográficas para serem exibidas no site.</p>
        <p>Depois pode cadastrar as músicas que deseja vender na plataforma.</p>
      </Modal>
    );
  }

  modalRemove() {
    const modalActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeModalRemove.bind(this) },
      { text: 'REMOVER', pallet: { fill: 'red', text: 'white' }, loading: this.state.loadingRemove, click: this.confirmRemove.bind(this) }
    ];

    return ( 
      <Modal title="Confirmação" 
        actions={ modalActions } show={ this.state.showConfirmRemove } 
        onClose={ this.closeModalRemove }
      >
        <div>
          Deseja realmente remover a conta?<br />
          Você perderá acesso ao sistema administrativo e as músicas cadastradas!
        </div>
      </Modal>
    );
  }

  confirmRemove() {
    this.toggleLoadingRemove(true);
    this.props.remove(this.id, this.afterRemove);
  }
  
  afterRemove(success) {
    if (!success) {
      this.toggleLoadingRemove(false);
      return;
    }
    this.props.archiveByCompositor(this.state.user, () => {
      this.toggleLoadingRemove(false);
      this.setState({ 
        ...this.state, 
        showConfirmRemove: false 
      });
      this.props.logout()
    });
  }

  toggleLoadingRemove(loading) {
    this.setState({ 
      ...this.state, 
      loadingRemove: loading
    });
  }

  closeModalRemove() {
    this.setState({ ...this.state, showConfirmRemove: false });
  }

  remove() {
    this.setState({ ...this.state, 
      showConfirmRemove: true
    });
  }

  buttons() {
    return (
      <div className="user-buttons">
        <SubmitButton text="REMOVER" backgroundColor="red" loading={ this.state.removeLoading } onClick={ this.remove }/>
        <SubmitButton text="SALVAR" loading={ this.state.saveLoading } onClick={ this.props.submitForm }/>
      </div>
    );
  }
}

const biographyForm = reduxForm({ form: 'biography-form' })(withRouter(BiographyForm));
const selector = formValueSelector('biography-form');
const mapStateToProps = state => ({ 
  user: state.auth.user,
  imageUrl: selector(state, 'imageUrl')
});
const mapDispatchToProps = dispatch => bindActionCreators({ update, remove, logout, archiveByCompositor, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(biographyForm);
