import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, remove } from '../../../../reducers/playlists/PlaylistsActions';
import ListBase from '../../../partials/list-base/ListBase';

class PlaylistList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Playlists';
    this.className = 'page-playlist-list';
    this.configure();
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 100 }
    ];
  }
  
  getList() {
    return this.props.playlists;
  }
}

const mapStateToProps = state => ({ playlists: state.playlists });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlaylistList));
