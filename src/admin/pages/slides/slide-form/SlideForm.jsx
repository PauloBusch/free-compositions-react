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
import { create, update, loadForm, submitForm } from '../../../../reducers/slides/SlidesActions';

const DEFAULT_STATE = {
  image: null,
  positionX: 'center',
  positionY: 'center'
};

class SlideForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Slide';
  }

  getTitle() {
    if (this.id)
      return `Edição do ${this.title}`;
    
    return `Cadastro do ${this.title}`;
  }

  form() {
    const positionXOptions = [
      { text: 'Esquerda', value: 'left' },
      { text: 'Centro', value: 'center' },
      { text: 'Direita', value: 'right' }
    ];
    const positionYOptions = [
      { text: 'Topo', value: 'top' },
      { text: 'Centro', value: 'center' },
      { text: 'Embaixo', value: 'bottom' }
    ];
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="image" className="image-field" label="Imagem" button="Selecionar" placeholder="Selecione uma imagem"
            flex="25" component={ File } validate={ required }
          />
          <Field name="positionX" label="Posição Horizontal" 
            flex="25" component={ Select } options={ positionXOptions } object validate={ required }
          />
          <Field name="positionY" label="Posição Vertical" 
            flex="25" component={ Select } options={ positionYOptions } object validate={ required }
          />
        </Row>
      </Form>
    );
  }
}

const slideForm = reduxForm({ form: 'slide-form' })(withRouter(SlideForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(slideForm);
