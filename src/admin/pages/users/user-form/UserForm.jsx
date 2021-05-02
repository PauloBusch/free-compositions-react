
import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
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
import Col from './../../../../common/col/index';
import Image from './../../../../common/fields/image/index';
import TextArea from './../../../../common/fields/textarea/TextArea';

const DEFAULT_STATE = {
  name: '',
  email: '',
  role: ''
};

class UserForm extends FormBase { 
  constructor(props) {
    super(props);
    
    const { router } = this.props;
    if (!this.id) {
      const data = DEFAULT_STATE;
      if (router.params.role) data.role = router.params.role;
      this.props.initialize(data);
    }
    this.title = 'Usuário';
  }

  form() {
    const roles = ['Admin', 'Compositor'];
    const { handleSubmit, role, imageUrl } = this.props;
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
              orientation="A senha deve conter caracteres especiais, números e letras em maiúsculo e minúsculo com no mínimo 8 caracteres"
              flex="25" component={ Input } validate={ [required, password] }
            />
          </If>
        </Row>

        <If test={ role === 'Compositor' }>
          <Row justify="flex-start">
            <Col flex="25">
              <Row height="100%" justify="flex-start">
                <Field name="image" className="image-field" label="Foto" 
                  imageDefault="images/users/default-avatar.png"
                  imageUrl={ imageUrl }
                  flex="100" component={ Image }
                />
              </Row>
            </Col>
            <Col flex="75" style={ { paddingLeft: '12px' } }>
              <Row justify="flex-start">
                <Field name="birthDate" type="date" label="Data de Nascimento"
                  flex="25" component={ Input }
                />
              </Row>
              <Row justify="flex-start">
                <Field name="biography" label="Resumo da Carreira Musical" placeholder="Informe um resumo"
                  flex="100" rows="10" component={ TextArea }
                />
              </Row>
            </Col>
          </Row>
        </If>
      </Form>
    );
  }
}

const userForm = reduxForm({ form: 'user-form' })(withRouter(UserForm));
const selector = formValueSelector('user-form');
const mapStateToProps = state => ({
  role: selector(state, 'role'),
  imageUrl: selector(state, 'imageUrl')
});
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(userForm);
