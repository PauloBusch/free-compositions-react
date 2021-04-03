
import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from './../../../../common/validators/required';
import Row from '../../../../common/row/Row';
import FormBase from './../../../../common/form/FormBase';
import Input from './../../../../common/fields/input/Input';
import { create, update, loadForm, submitForm } from './../../../../reducers/playlists/PlaylistsActions';

const DEFAULT_STATE = {
  name: ''
};

class PlaylistForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Playlist';
  }

  getTitle() {
    if (this.id)
      return `Edição da ${this.title}`;
    
    return `Cadastro da ${this.title}`;
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

const playlistForm = reduxForm({ form: 'playlist-form' })(withRouter(PlaylistForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(playlistForm);
