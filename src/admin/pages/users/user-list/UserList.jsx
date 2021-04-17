import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, remove } from '../../../../reducers/users/UsersActions';
import ListBase from '../../../partials/list-base/ListBase';

class UserList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Usuários';
    this.className = 'page-user-list';
    this.configure();
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 20 },
      { prop: 'email', label: 'Email', flex: 20 },
      { prop: 'role', label: 'Papel', flex: 20 }
    ];
  }
  
  getList() {
    return this.props.users;
  }
}

const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList));
