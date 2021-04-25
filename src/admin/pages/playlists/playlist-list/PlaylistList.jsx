import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, updateOrderBulk, remove } from '../../../../reducers/playlists/PlaylistsActions';
import ListBase from '../../../partials/list-base/ListBase';
import Image from '../../../../common/image/Image';

class PlaylistList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Playlists';
    this.className = 'page-playlist-list';
  }

  confirmRemove() {
    this.toggleLoadingRemove(true);
    this.props.remove(this.state.selected, this.afterRemove);
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'image', label: 'Capa', flex: 5, template: Image },
      { prop: 'name', label: 'Nome', flex: 95 }
    ];

    this.sort = 'desc';
  }
  
  getList() {
    return this.props.playlists;
  }
}

const mapStateToProps = state => ({ playlists: state.playlists });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlaylistList));
