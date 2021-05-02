import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from './../../../../common/validators/required';
import Select from './../../../../common/fields/select/Select';
import Row from '../../../../common/row/Row';
import File from './../../../../common/fields/file/File';
import FormBase from './../../../../common/form/FormBase';
import { create, update, loadForm, submitForm } from '../../../../reducers/slides/SlidesActions';
import Input from './../../../../common/fields/input/Input';
import Checkbox from './../../../../common/fields/checkbox/index';
import url from './../../../../common/validators/url/url';

const DEFAULT_STATE = {
  image: null,
  positionX: 'center',
  positionY: 'center',
  overlaySlide: false,
  actionLabel: '',
  actionUrl: ''  
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
          <Field name="overlaySlide" label="Conteúdo Sobreposto" type="checkbox" 
            flex="25" component={ Checkbox }
          />
        </Row>
        { this.overlaySlideContent() }
      </Form>
    );
  }

  overlaySlideContent() {
    const { overlaySlide } = this.props;
    if (!overlaySlide) return false;

    return (
      <Row justify="flex-start">
        <Field name="actionLabel" label="Texto do Botão" type="text" placeholder="Informe o texto"
          flex="25" component={ Input } validate={ required }
        />
        <Field name="actionUrl" label="Url do Botão" type="text" placeholder="Informe a url" className="field-padding"
          flex="25" component={ Input } validate={ [required, url] }
        />
      </Row>
    );
  }
}

const slideForm = reduxForm({ form: 'slide-form' })(withRouter(SlideForm));
const selector = formValueSelector('slide-form');
const mapStateToProps = state => ({ overlaySlide: selector(state, 'overlaySlide') });
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(slideForm);
