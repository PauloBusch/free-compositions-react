import './music-form.css';

import React from 'react';
import { Field } from 'redux-form';

import urlYoutube from '../../../../common/validators/url/url-youtube';
import required from '../../../../common/validators/required';
import Select from '../../../../common/fields/select/Select';
import Row from '../../../../common/row/Row';
import FormBase from '../../../../common/form/FormBase';
import Input from '../../../../common/fields/input/Input';
import { MUSIC_PENDING, MUSIC_PUBLIC } from '../../../../reducers/musics/MusicStatus';
import TextEditor from './../../../../common/fields/text-editor/index';
import requiredTextEditor from './../../../../common/validators/requiredTextEditor';
import MultiSelect from './../../../../common/fields/multi-select/index';

const DEFAULT_STATE = {
  url: '',
  name: '',
  compositors: null,
  genre: null,
  style: null,
  status: MUSIC_PUBLIC,
  letter: '',
  price: null,
  rejectJustification: ''
};

export default class MusicFormBase extends FormBase { 
  constructor(props) {
    super(props);
    const { user } = this.props;
    if (user && user.role === 'Compositor') {
      DEFAULT_STATE.compositors = [user.name];
      DEFAULT_STATE.status = MUSIC_PENDING;
    }
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.readonly = this.isReadonly();
    this.title = 'Música';
  }

  componentWillMount() {
    this.props.getGenresAll();
    this.props.getUsersAll();
    this.props.getStylesAll();
    this.props.getPlaylistAll();
  }

  goBack() {
    const { router } = this.props;
    const { pathname } = router.location;
    if (!this.needGoBack()) return;
    
    const { user } = this.props;
    if (pathname.search(/\/new/) !== -1 && user.role === 'Compositor') {
      const url = pathname.substring(0, pathname.search(/\/new/));
      return router.push(`${url}/pending`);
    }
    router.goBack();
  }

  getTitle() {
    if (this.id) {
      if (this.state.loading)
        return 'Carregando...';
      
      if (this.readonly)
        return `Detalhes da ${this.title}`;

      return `Edição da ${this.title}`;
    }
    
    return `Cadastro de ${this.title}`;
  }  

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/edit\/|\/view\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  isReadonly() {
    const { router } = this.props;
    const { pathname } = router.location;
    return pathname.search(/\/view\//) !== -1;
  }

  needGoBack() {  
    return true;
  }

  fields() {
    const readonly = this.readonly;
    const { user } = this.props;
    const isCompositor = user.role === 'Compositor';
    const genres = this.props.genres.map(g => g.name);
    const compositors = this.props.users.filter(u => u.role === 'Compositor')
      .map(u => ({ value: u.name, text: u.name, disabled: isCompositor && user.name === u.name }));
    const styles =  this.props.styles.map(g => g.name);
    const playlists = this.props.playlists.map(g => g.name);

    return (
      <div>
        <Row className="hidden">
          <Field name="status" type="hidden" component={ Input } readOnly={ readonly }/>
        </Row>
        <Row justify="flex-start">
          <Field name="url" type="text" label="Url do YoutTube" placeholder="Informe a url do youtube"
            flex="25" component={ Input } validate={ [required, urlYoutube] } readOnly={ readonly }
          />
          <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
            flex="25" component={ Input } validate={ required } readOnly={ readonly }
          />
          <Field name="compositors" label="Compositores"
            flex="25" component={ MultiSelect } options={ compositors } insert object validate={ required }
          />
          <Field name="price" type="number" label="Preço" placeholder="Informe o preço"
            flex="25" component={ Input } readOnly={ readonly }
          />
        </Row>
        <Row justify="flex-start">
          <Field name="genre" label="Gênero"
            flex="25" component={ Select } options={ genres } validate={ required } readOnly={ readonly }
          />
          <Field name="style" label="Estilo"
            flex="25" component={ Select } options={ styles } validate={ required } readOnly={ readonly }
          />
          <Field name="playlist" label="Playlist" className="field-padding"
            flex="25" component={ Select } options={ playlists } readOnly={ readonly }
          />
        </Row>
        <Row justify="flex-start">
          <Field name="letter" label="Letra" placeholder="Informe a letra"
            flex="100" component={ TextEditor } validate={ requiredTextEditor } readOnly={ readonly }
          />
        </Row>
      </div>
    );
  }
}
