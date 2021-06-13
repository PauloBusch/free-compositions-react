import './genre.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getById } from './../../../reducers/genres/GenresActions';
import Loading from './../../../common/loading/Loading';
import GaleryMusic from './../../common/galery/galery-music/GaleryMusic';
import Message from '../../../common/table/message/Message';

class GenreDetail extends Component {
  constructor(props) {
    super(props);

    this.id = this.getId();
    this.state = { loading: true, artist: null, musics: null };
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
        genre: data
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
    return (<div id="genre">{ this.detail() }</div>);
  }

  detail() {
    if (this.state.loading) 
      return <Loading style={ { marginTop: '15vh' } }/>;

    const { genre } = this.state;
    return (
      <div>
        <h2>{ genre.name }</h2>
        <GaleryMusic genreName={ this.state.genre.name } emptyMessage="Nenhuma música do gênero"/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(null, mapDispatchToProps)(GenreDetail);
