
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
import { getAll as getGenresAll } from './../../../../reducers/genres/GenresActions';
import { getAll as getUsersAll } from './../../../../reducers/users/UsersActions';
import { getAll as getStylesAll } from './../../../../reducers/styles/StylesActions';

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
    const { user } = this.props;
    if (user && user.role === 'Compositor') {
      DEFAULT_STATE.compositor = user.name;
    }
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Letra';
  }

  componentWillMount() {
    this.props.getGenresAll();
    this.props.getUsersAll();
    this.props.getStylesAll();
  }

  getTitle() {
    if (this.id)
      return `Edição da ${this.title}`;
    
    return `Cadastro de ${this.title}`;
  }

  form() {
    const { user } = this.props;
    const genres = this.props.genres.map(g => g.name);
    const compositors = this.props.users.filter(u => u.role === 'Compositor').map(u => u.name);
    const styles =  this.props.styles.map(g => g.name);
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
            flex="25" component={ Input } validate={ required }
          />
          <Field name="compositor" label="Compositor" placeholder="Informe o compositor"
            flex="25" component={ Select } options={ compositors } readOnly={ user.role === 'Compositor' } validate={ required }
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
const mapStateToProps = state => ({ user: state.auth.user, genres: state.genres, users: state.users, styles: state.styles });
const mapDispatchToProps = dispatch => bindActionCreators({ getGenresAll, getUsersAll, getStylesAll, create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(letterForm);
