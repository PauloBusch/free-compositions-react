import './MusicForm.css';

import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import urlYoutube from './../../../../common/validators/url/url-youtube';
import required from './../../../../common/validators/required';
import Select from './../../../../common/fields/select/Select';
import Row from '../../../../common/row/Row';
import File from './../../../../common/fields/file/File';
import FormBase from './../../../../common/form/FormBase';
import Input from './../../../../common/fields/input/Input';
import { create, update, loadForm, submitForm } from './../../../../reducers/musics/MusicsActions';
import { getAll as getGenresAll } from './../../../../reducers/genres/GenresActions';
import { getAll as getUsersAll } from './../../../../reducers/users/UsersActions';
import { getAll as getStylesAll } from './../../../../reducers/styles/StylesActions';
import { getAll as getPlaylistAll } from './../../../../reducers/playlists/PlaylistsActions';
import TextArea from './../../../../common/fields/textarea/TextArea';

const DEFAULT_STATE = {
  url: '',
  name: '',
  compositor: null,
  genre: null,
  style: null,
  letter: '',
};

class MusicForm extends FormBase { 
  constructor(props) {
    super(props);
    const { user } = this.props;
    if (user && user.role === 'Compositor') {
      DEFAULT_STATE.compositor = user.name;
    }
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Música';
  }

  componentWillMount() {
    this.props.getGenresAll();
    this.props.getUsersAll();
    this.props.getStylesAll();
    this.props.getPlaylistAll();
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
    const playlists = this.props.playlists.map(g => g.name);
    const { handleSubmit } = this.props;
    return (
      <Form id="music-form" onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="url" type="text" label="Url do YoutTube" placeholder="Informe a url do youtube"
            flex="25" component={ Input } validate={ [required, urlYoutube] }
          />
          <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
            flex="25" component={ Input } validate={ required }
          />
          <Field name="compositor" label="Compositor"
            flex="25" component={ Select } options={ compositors } readOnly={ user.role === 'Compositor' } validate={ required }
          />
          <Field name="genre" label="Gênero"
            flex="25" component={ Select } options={ genres } validate={ required }
          />
        </Row>
        <Row justify="flex-start">
          <Field name="style" label="Estilo"
            flex="25" component={ Select } options={ styles } validate={ required }
          />
          <Field name="playlist" label="Playlist" className="field-padding"
            flex="25" component={ Select } options={ playlists }
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

const musicForm = reduxForm({ form: 'music-form' })(withRouter(MusicForm));
const mapStateToProps = state => ({ user: state.auth.user, genres: state.genres, users: state.users, styles: state.styles, playlists: state.playlists });
const mapDispatchToProps = dispatch => bindActionCreators({ getGenresAll, getUsersAll, getStylesAll, getPlaylistAll, create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(musicForm);
