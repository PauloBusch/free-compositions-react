import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, remove } from '../../../../reducers/styles/StylesActions';
import ListBase from '../../../partials/list-base/ListBase';

class StyleList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Estilos';
    this.className = 'page-style-list';
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
    return this.props.styles;
  }
}

const mapStateToProps = state => ({ styles: state.styles });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StyleList));
