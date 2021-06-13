import { formatDateTime } from './../../../common/formatters/date';
import { getRouteWithoutParams } from './../../../common/router/index';
import ListBase from './../../partials/list-base/ListBase';

import moment from 'moment';
import { DEFAULT_FILTER } from './logins/filter';

export default class HistoryListBase extends ListBase {
  constructor(props, type) {
    super(props);

    this.type = type;
    this.className = 'page-history-list';
    this.configure();
  }

  componentWillMount() {
    this.toggleLoading(true);
    this.props.getAllByFilter({ type: this.type, ...DEFAULT_FILTER }, this.afterLoad);
  }

  afterLoad(success) {
    if (success) {
      this.setState({ 
        ...this.state, 
        loading: false
      });
    }
  }

  configure() {
    this.canAdd = false;
    this.canOpen = false;
    this.tableActions = [];
    this.tableColumns = [
      { prop: 'user', label: 'Usuário', flex: 80 },
      { prop: 'createdAt', label: 'Data/Hora', flex: 20, format: formatDateTime }
    ];
  }

  goNew() {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/new/${this.type}`;
    router.push(url);
  }
  
  getList() {
    return this.props.histories;
  }
}

