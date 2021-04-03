
import './MusicForm.css';

import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from './../../../../common/validators/required';
import Select from './../../../../common/fields/select/Select';
import Row from '../../../../common/row/Row';
import File from './../../../../common/fields/file/File';
import FormBase from './../../../../common/form/FormBase';
import Input from './../../../../common/fields/input/Input';
import { create, update, loadForm, submitForm } from './../../../../reducers/musics/MusicsActions';

const DEFAULT_STATE = {
  image: '',
  compositor: '',
  name: ''
};

class MusicForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Música';
  }

  form() {
    const compositors = ['Fabrício Brasílio', 'Joana Antonio'];
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="image" className="image-field" label="Imagem de Capa" 
            accept="image/*"
            button="Selecionar" placeholder="Selecione uma imagem"
            flex="25" component={ File } validate={ required }
          />
          <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
            flex="25" component={ Input } validate={ required }
          />
          <Field name="compositor" label="Compositor" placeholder="Informe o compositor"
            flex="25" component={ Select } options={ compositors } insert validate={ required }
          />
        </Row>
      </Form>
    );
  }
}

const musicForm = reduxForm({ form: 'music-form' })(withRouter(MusicForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(musicForm);
