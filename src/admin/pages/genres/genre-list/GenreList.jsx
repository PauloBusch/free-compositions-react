import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, remove } from '../../../../reducers/genres/GenresActions';
import ListBase from '../../../partials/list-base/ListBase';

class GenreList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Gêneros';
    this.className = 'page-genre-list';
    this.configure();
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 100 }
    ];
    this.tablePallet = {
      text: 'black',
      fill: '#007bff57'
    };
  }
  
  getList() {
    return this.props.genres;
  }
}

const mapStateToProps = state => ({ genres: state.genres });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GenreList));
