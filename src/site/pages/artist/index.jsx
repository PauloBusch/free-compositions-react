import './artist.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from './../../../common/row/Row';
import Col from './../../../common/col/index';
import { formatDate } from './../../../common/formatters/date';
import { bindActionCreators } from 'redux';
import { getById } from './../../reducers/artists/ArtistsActions';
import Loading from './../../../common/loading/Loading';
import GaleryMusic from './../../common/galery/galery-music/GaleryMusic';

class ArtistDetail extends Component {
  constructor(props) {
    super(props);

    this.id = this.getId();
    this.state = { loading: true, artist: null };
    this.afterLoad = this.afterLoad.bind(this);
    this.getData = this.getData.bind(this);
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
        loading: false,
        artist: data
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
    if (this.state.loading) 
      return <Loading style={ { marginTop: '15vh' } }/>;

    const { artist } = this.state;
    return (
      <div>
        <h2>Biografia do Artista</h2>
        <div>
          <Row className="artist-details">
            <Col flex="25">
              <Row height="100%">
                <div className="img" style={ { backgroundImage: `url('${artist.image}')` } }></div>
              </Row>
            </Col>
            <Col flex="75" className="artist-info" style={ { paddingLeft: '25px' } }>
              <div className="name"><strong>Nome: </strong>{ artist.name }</div>
              <div className="birthDate"><strong>Data de Nascimento: </strong>{ artist.birthDate ? formatDate(artist.birthDate) : '[Não informado]' }</div>
              <div className="biography"><p>{ artist.biography || '' }</p></div>
            </Col>
          </Row>
          <div>
            <h2>Músicas do Artista</h2>
            <GaleryMusic compositorName={ artist.name } emptyMessage="Nenhuma música cadastrada"/>;
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(null, mapDispatchToProps)(ArtistDetail);
