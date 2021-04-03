
import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from './../../../../common/validators/required';
import Row from '../../../../common/row/Row';
import FormBase from './../../../../common/form/FormBase';
import Input from './../../../../common/fields/input/Input';
import { create, update, loadForm, submitForm } from './../../../../reducers/styles/StylesActions';

const DEFAULT_STATE = {
  name: ''
};

class StyleForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Estilo';
  }

  form() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
            flex="25" component={ Input } validate={ required }
          />
        </Row>
      </Form>
    );
  }
}

const styleForm = reduxForm({ form: 'style-form' })(withRouter(StyleForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(styleForm);
