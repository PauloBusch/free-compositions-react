import './music-form.css';

import React from 'react';
import { Field } from 'redux-form';

import urlYoutube from '../../../../common/validators/url/url-youtube';
import required from '../../../../common/validators/required';
import Select from '../../../../common/fields/select/Select';
import Row from '../../../../common/row/Row';
import FormBase from '../../../../common/form/FormBase';
import Input from '../../../../common/fields/input/Input';
import TextArea from '../../../../common/fields/textarea/TextArea';
import { MUSIC_PENDING, MUSIC_PUBLIC } from '../../../../reducers/musics/MusicStatus';

const DEFAULT_STATE = {
  url: '',
  name: '',
  compositor: null,
  genre: null,
  style: null,
  status: MUSIC_PUBLIC,
  letter: '',
  rejectJustification: ''
};

export default class MusicFormBase extends FormBase { 
  constructor(props) {
    super(props);
    const { user } = this.props;
    if (user && user.role === 'Compositor') {
      DEFAULT_STATE.compositor = user.name;
      DEFAULT_STATE.status = MUSIC_PENDING;
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

  needGoBack() {  
    return true;
  }

  fields(readonly) {
    const { user } = this.props;
    const genres = this.props.genres.map(g => g.name);
    const compositors = this.props.users.filter(u => u.role === 'Compositor').map(u => u.name);
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
          <Field name="compositor" label="Compositor"
            flex="25" component={ Select } options={ compositors } 
            readOnly={ user.role === 'Compositor' || readonly } validate={ required }
          />
          <Field name="genre" label="Gênero"
            flex="25" component={ Select } options={ genres } validate={ required } readOnly={ readonly }
          />
        </Row>
        <Row justify="flex-start">
          <Field name="style" label="Estilo"
            flex="25" component={ Select } options={ styles } validate={ required } readOnly={ readonly }
          />
          <Field name="playlist" label="Playlist" className="field-padding"
            flex="25" component={ Select } options={ playlists } readOnly={ readonly }
          />
        </Row>
        <Row justify="flex-start">
          <Field name="letter" label="Letra" placeholder="Informe a letra"
            flex="100" rows="10" component={ TextArea } validate={ required } readOnly={ readonly }
          />
        </Row>
      </div>
    );
  }
}
