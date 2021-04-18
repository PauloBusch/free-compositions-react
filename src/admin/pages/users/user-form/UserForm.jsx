
import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from './../../../../common/validators/required';
import Select from './../../../../common/fields/select/Select';
import Row from '../../../../common/row/Row';
import FormBase from './../../../../common/form/FormBase';
import Input from './../../../../common/fields/input/Input';
import email from './../../../../common/validators/email';
import { create, update, loadForm, submitForm } from './../../../../reducers/users/UsersActions';
import password from './../../../../common/validators/password';
import If from '../../../../common/operators/If';

const DEFAULT_STATE = {
  name: '',
  email: '',
  role: null
};

class UserForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Usuário';
  }

  form() {
    const roles = ['Admin', 'Compositor'];
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
            flex="25" component={ Input } validate={ required }
          />
          <Field name="email" type="email" label="Email" placeholder="Informe o email"
            flex="25" component={ Input } readOnly={ !!this.id } validate={ [required, email] }
          />
          <Field name="role" label="Papel" placeholder="Informe o papel"
            flex="25" component={ Select } options={ roles } validate={ required }
          />
          <If test={ !this.id }>
            <Field name="password" type="password" label="Senha" placeholder="Informe a senha"
              flex="25" component={ Input } validate={ [required, password] }
            />
          </If>
        </Row>
      </Form>
    );
  }
}

const userForm = reduxForm({ form: 'user-form' })(withRouter(UserForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(userForm);
