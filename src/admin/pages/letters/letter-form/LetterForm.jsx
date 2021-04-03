
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
import TextArea from './../../../../common/fields/textarea/TextArea';
import { create, update, loadForm, submitForm } from './../../../../reducers/letters/LettersActions';

const DEFAULT_STATE = {
  name: '',
  style: null,
  genre: null,
  compositor: null,
  letter: ''
};

class LetterForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Letra';
  }

  form() {
    const compositors = ['Fabrício Brasílio', 'Joana Antonio'];
    const genres = ['Pop', 'MPB', 'Rap', 'Rock', 'Sertanejo', 'Eletrônica'];
    const styles = ['Estilo 1', 'Estilo 2'];
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
            flex="25" component={ Input } validate={ required }
          />
          <Field name="compositor" label="Compositor" placeholder="Informe o compositor"
            flex="25" component={ Select } options={ compositors } validate={ required }
          />
          <Field name="genre" label="Gênero" placeholder="Informe o gênero"
            flex="25" component={ Select } options={ genres } validate={ required }
          />
          <Field name="style" label="Estilo" placeholder="Informe o estilo"
            flex="25" component={ Select } options={ styles } validate={ required }
          />
        </Row>
        <Row justify="flex-start">
          <Field name="letter" label="Letra" placeholder="Informe a letra"
            flex="100" rows="10" component={ TextArea } validate={ required }
          />
        </Row>
      </Form>
    );
  }
}

const letterForm = reduxForm({ form: 'letter-form' })(withRouter(LetterForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(letterForm);
