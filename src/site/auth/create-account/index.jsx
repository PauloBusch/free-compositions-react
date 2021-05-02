import './create-account.css';

import React, { Component } from 'react';
import { hashHistory, withRouter, Link } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { reduxForm, formValueSelector, Form, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { create, submitForm } from './../../../reducers/users/UsersActions';
import required from './../../../common/validators/required';
import password from './../../../common/validators/password';
import email from './../../../common/validators/email';
import SubmitButton from '../../../common/buttons/submit/SubmitButton';
import Input from './../../../common/fields/input/Input';
import Toastr from '../../../common/messages/toastr';
import TermsOfUse from '../terms-of-use';
import Modal from '../../../common/modal/Modal';

const DEFAULT_VALUES = {
  name: '',
  email: '',
  role: null,
  password: null,
  confirmPassword: null
};

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false, showTerms: false };
    this.type = this.props.router.params.type;
    if (['Usuário', 'Compositor'].indexOf(this.type) === -1)
      hashHistory.push('/type-account');
    const data = DEFAULT_VALUES;
    data.role = this.type;
    this.props.initialize(data);
    this.equalPassword = this.equalPassword.bind(this);
    this.submit = this.submit.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
    this.toggleSaveLoading = this.toggleSaveLoading.bind(this);
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  submit(values) {
    if (this.type === 'Compositor') 
      return this.setState({ ...this.state, values: values, showTerms: true });
    this.save(values);
  }

  save(values) {
    this.toggleSaveLoading(true);
    this.props.create(values, this.afterSubmit);
  }
    
  afterSubmit(success) {
    this.toggleSaveLoading(false);
    if (success) {
      const type = this.props.router.params.type;
      if (type === 'Usuário')
        hashHistory.push('/');
      if (type === 'Compositor')
        hashHistory.push('/admin/biography');
    }
  }

  toggleSaveLoading(loading) {
    this.setState({
      ...this.state, 
      loading: loading 
    });
  }

  equalPassword(value) {
    const { password } = this.props;
    if (!value) return undefined;
    if (password === value) return undefined;
    return 'As senhas deve coincidir';
  }

  reject() {
    toastr.warning('Aviso', 'Para acessar o sistema é necessário aceitar os termos do contrato!');
    this.closeModal();
  }

  accept() {
    this.save(this.state.values);
    this.closeModal();
  }

  closeModal() {
    this.setState({ ...this.state, showTerms: false });
  }

  render() {
    const { handleSubmit } = this.props;
    const modalActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.reject },
      { text: 'ACEITAR', pallet: { fill: '#0276cd', text: 'white' }, click: this.accept }
    ];

    return (
      <div className="background-account">
        <Form id="form-account" onSubmit={ handleSubmit(this.submit) }>
          <h2>Nova conta</h2>

          <Field name="name" type="text" label="Nome Completo" placeholder="Informe o nome completo"
            component={ Input } validate={ required }
          />
          <Field name="email" type="email" label="Email" placeholder="Informe o email"
            component={ Input } validate={ [required, email] }
          />
          <Field name="password" type="password" label="Senha" placeholder="Informe a senha"
            component={ Input } validate={ [required, password] }
          />
          <Field name="confirmPassword" type="password" label="Confirmação da Senha" placeholder="Informe a confirmação da senha"
            component={ Input } validate={ [required, this.equalPassword] }
          />
          <Link className="link-login" to="/login">Já tenho uma conta</Link>
          <SubmitButton loading={ this.state.loading } fill padding="10px" text="Criar nova conta"/>
        </Form>
        <Modal title="Termos e Condições de Uso" 
          actions={ modalActions } show={ this.state.showTerms } 
          onClose={ this.reject }>
          <TermsOfUse />
        </Modal>
        <Toastr/>
      </div>
    );
  }
}

const createAccountForm = reduxForm({ form: 'user-form' })(withRouter(CreateAccountForm));
const selector = formValueSelector('user-form');
const mapStateToProps = state => ({ 
  password: selector(state, 'password')
});
const mapDispatchToProps = dispatch => bindActionCreators({ create, submitForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(createAccountForm);

