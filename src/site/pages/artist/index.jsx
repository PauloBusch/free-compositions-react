import './artist.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from './../../../common/row/Row';
import Col from './../../../common/col/index';
import { formatDate } from './../../../common/formatters/date';
import { bindActionCreators } from 'redux';
import { getById } from './../../reducers/artists/ArtistsActions';
import { getAllByCompositor } from './../../../reducers/musics/MusicsActions';
import Loading from './../../../common/loading/Loading';
import GaleryMusic from './../../common/galery/galery-music/GaleryMusic';

class ArtistDetail extends Component {
  constructor(props) {
    super(props);

    this.id = this.getId();
    this.state = { loading: true, artist: null, musics: null };
    this.afterLoad = this.afterLoad.bind(this);
    this.afterLoadGalery = this.afterLoadGalery.bind(this);
    this.getData = this.getData.bind(this);
    this.getGalery = this.getGalery.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    this.props.getById(this.id, this.afterLoad);
  }

  afterLoad(success, data) {
    if (success) {    
      this.setState({ 
        ...this.state, 
        artist: data
      });
      this.getGalery(data);
    }
  }

  getGalery(artist) {
    this.props.getAllByCompositor(artist.name, this.afterLoadGalery);
  }

  afterLoadGalery(success, data) {
    if (success) {    
      this.setState({ 
        ...this.state,
        musics: data,
        loading: false
      });
    }
  }

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/view\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  render() {
    return (<div id="artist">{ this.detail() }</div>);
  }

  detail() {
    if (this.state.loading || !this.state.artist || !this.state.musics) 
      return <Loading style={ { marginTop: '15vh' } }/>;

    const { artist } = this.state;
    return (
      <div>
        <h2>Biografia do Artista</h2>
        <div>
          <Row className="artist-details">
            <Col flex="25">
              <Row height="100%">
                <div className="img" style={ { backgroundImage: `url('${artist.image || 'images/users/default-avatar.png'}')` } }></div>
              </Row>
            </Col>
            <Col flex="75" className="artist-info" style={ { paddingLeft: '25px' } }>
              <div className="name"><strong>Nome: </strong>{ artist.name }</div>
              <div className="birthDate"><strong>Data de Nascimento: </strong>{ artist.birthDate ? formatDate(artist.birthDate) : '[Não informado]' }</div>
              <div className="biography"><p>{ artist.biography || '' }</p></div>
            </Col>
          </Row>
          <h2>Músicas do Artista</h2>
          <GaleryMusic cards={ this.state.musics }/>;
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getById, getAllByCompositor }, dispatch);
export default connect(null, mapDispatchToProps)(ArtistDetail);
