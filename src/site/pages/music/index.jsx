import './music.css';
import moment from 'moment';

import React, { Component } from 'react';
import Row from '../../../common/row/Row';
import Col from '../../../common/col/index';
import Loading from '../../../common/loading/Loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getById } from '../../../reducers/musics/MusicsActions';
import { getYoutubeLink } from '../../../common/api/youtube';
import Message from '../../../common/table/message/Message';
import { redirectToLogin } from '../../../reducers/auth/AuthActions';

class MusicPreview extends Component {
  constructor(props) {
    super(props);

    this.id = this.getId();
    this.state = { loading: true, music: null };
    this.afterLoad = this.afterLoad.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    if (!this.props.user) {
      redirectToLogin();
      return;
    }
    this.getData();
  }

  getData() {
    this.props.getById(this.id, this.afterLoad);
  }

  afterLoad(success, data) {
    if (success) {    
      this.setState({ 
        ...this.state, 
        loading: false,
        music: { ...data, letter: this.treatHtml(data.letter) }
      });
    }
  }

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/preview\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  render() {
    return (<div id="music">{ this.detail() }</div>);
  }
  
  getPriceFormatted(price) {
    if (!price) return 'Grátis';
    const value = parseFloat(price);
    if (isNaN(value) || !value) return 'Grátis';
    return `R$ ${value.toLocaleString()}`;
  }

  treatHtml(text) {
    if (!text) return '';
    return text
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/(<? *script)/gi, 'illegalscript');
  }

  detail() {
    if (this.state.loading || !this.state.music) 
      return <Loading style={ { marginTop: '15vh' } }/>;

    if (moment(this.state.music.expirationLink).isSameOrBefore(moment()))
      return <Message message="Link Expirado" style={ { marginTop: '15vh' } }/>;

    const { music } = this.state;
    return (
      <div>
        <h2>Detalhes da Música</h2>
        <div>
          <Row className="music-details" justify="flex-start">
            <Col flex="50">
              <Row height="30vw">
                <iframe className="img" src={ getYoutubeLink(music.url) }/>
              </Row>
            </Col>
            <Col flex="25" className="music-info" style={ { paddingLeft: '25px' } }>
              <div><strong>Nome: </strong>{ music.name }</div>
              <div><strong>Compositores: </strong>{ music.compositors.join(', ') }</div>
              <div><strong>Preço: </strong>{ this.getPriceFormatted(music.price) }</div>
              <div><strong>Gênero: </strong>{ music.genre }</div>
              <div><strong>Estilo: </strong>{ music.style }</div>
              <div><strong>Playlist: </strong>{ music.playlist || '[Nenhuma]' }</div>
            </Col>
          </Row>
          <div className="letter-container">
            <h2>Letra</h2>              
            <div style={ { whiteSpace: 'pre-line' } } 
              dangerouslySetInnerHTML={ { __html: music.letter } }>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MusicPreview);
