import './MusicList.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import image from '../../../../common/image/Image';
import { getAll, remove } from '../../../../reducers/musics/MusicsActions';
import ListBase from '../../../partials/list/ListBase';

class MusicList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Músicas';
    this.className = 'page-music-list';
    this.configure();
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'image', label: 'Capa', flex: 5, template: image },
      { prop: 'name', label: 'Nome', flex: 40 },
      { prop: 'compositor', label: 'Compositor', flex: 40 }
    ];
    this. tablePallet = {
      text: 'black',
      fill: '#007bff57'
    };
  }
  
  getList() {
    return this.props.musics;
  }
}

const mapStateToProps = state => ({ musics: state.musics });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicList));
