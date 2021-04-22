import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { submitForm, loadForm, update } from '../../../reducers/users/UserBiographyActions';
import required from '../../../common/validators/required';
import Row from '../../../common/row/Row';
import FormBase from '../../../common/form/FormBase';
import Input from '../../../common/fields/input/Input';
import TextArea from '../../../common/fields/textarea/TextArea';
import Col from '../../../common/col/index';
import Image from '../../../common/fields/image/index';
import Modal from '../../../common/modal/Modal';

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

    const { user } = this.props;
    this.state = { ...this.state, showModal: !user.biography };
    this.closeModal = this.closeModal.bind(this);
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
    const modalActions = [
      { text: 'OK', pallet: { fill: '#0276cd', text: 'white' }, click: this.closeModal }
    ];

    return (
      <Form id="biography-form" onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Col flex="30">
            <Row height="100%" justify="flex-start">
              <Field name="image" className="image-field" label="Foto" 
                imageDefault="images/users/default-avatar.png"
                imageUrl={ imageUrl }
                flex="100" component={ Image } validate={ required }
              />
            </Row>
          </Col>
          <Col flex="70">
            <Row justify="flex-start">
              <Field name="name" type="text" label="Nome Completo" placeholder="Informe o nome"
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
        <Modal title="Atualização das Informações Bibliográficas" 
          actions={ modalActions } show={ this.state.showModal } 
          onClose={ this.closeModal }>
          <p>Seja bem vindo!</p>
          <p>Este é o painel administrativo destinado aos Compositores.</p>
          <p>Primeiro atualize as informações biográficas para serem exibidas no site.</p>
          <p>Depois pode cadastrar as músicas que deseja vender na plataforma.</p>
        </Modal>
      </Form>
    );
  }
}

const biographyForm = reduxForm({ form: 'biography-form' })(withRouter(BiographyForm));
const selector = formValueSelector('biography-form');
const mapStateToProps = state => ({ 
  user: state.auth.user,
  imageUrl: selector(state, 'imageUrl')
});
const mapDispatchToProps = dispatch => bindActionCreators({ update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(biographyForm);
