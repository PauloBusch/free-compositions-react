import ListBase from './../../partials/list-base/ListBase';
import { formatDateTime } from './../../../common/formatters/date';
import { getRouteWithoutParams } from './../../../common/router/index';

export default class HistoryListBase extends ListBase {
  constructor(props, type) {
    super(props);

    this.type = type;
    this.className = 'page-history-list';
    this.configure();
  }

  componentWillMount() {
    this.toggleLoading(true);
    this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }

  configure() {
    this.canAdd = false;
    this.canOpen = false;
    this.tableActions = [];
    this.tableColumns = [
      { prop: 'email', label: 'Login', flex: 40 },
      { prop: 'user', label: 'Usuário', flex: 40 },
      { prop: 'createdAt', label: 'Data/Hora', flex: 20, format: formatDateTime }
    ];
  }

  goNew() {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/new/${this.type}`;
    router.push(url);
  }
  
  getList() {
    return this.props.histories.filter(u => u.type === this.type);
  }
}

