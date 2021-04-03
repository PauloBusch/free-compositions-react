
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
import { create, update, loadForm, submitForm } from './../../../../reducers/genres/GenresActions';

const DEFAULT_STATE = {
  name: ''
};

class GenreForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Gênero';
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

const genreForm = reduxForm({ form: 'genre-form' })(withRouter(GenreForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(genreForm);
