
import MusicListBase from './../base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, updateOrderBulk, remove } from '../../../../../reducers/musics/MusicsActions';
import { MUSIC_PUBLIC } from '../../../../../reducers/musics/MusicStatus';

class MusicListPublic extends MusicListBase {
  constructor(props) {
    super(props, MUSIC_PUBLIC);
  }
} 


const mapStateToProps = state => ({ musics: state.musics, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListPublic));
