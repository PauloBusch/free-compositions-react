import ListBase from '../../../partials/list-base/ListBase';

export default class UserListBase extends ListBase {
  constructor(props, role) {
    super(props);

    this.role = role;
    this.className = 'page-user-list';
    this.configure();
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 50 },
      { prop: 'email', label: 'Email', flex: 50 }
    ];
  }
  
  getList() {
    return this.props.users.filter(u => u.role === this.role);
  }
}

