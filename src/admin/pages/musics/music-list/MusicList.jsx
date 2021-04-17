import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import image from '../../../../common/image/Image';
import { getAll, updateOrderBulk, remove } from '../../../../reducers/musics/MusicsActions';
import ListBase from '../../../partials/list-base/ListBase';

class MusicList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Músicas';
    this.className = 'page-music-list';
    this.configure();
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
      { prop: 'image', label: 'Capa', flex: 5, template: image },
      { prop: 'name', label: 'Nome', flex: 30 },
      { prop: 'compositor', label: 'Compositor', flex: 30 },
      { prop: 'genre', label: 'Gênero', flex: 30 }
    ];
    this.sort = 'desc';
  }
  
  getList() {
    return this.props.musics;
  }
}

const mapStateToProps = state => ({ musics: state.musics });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicList));
