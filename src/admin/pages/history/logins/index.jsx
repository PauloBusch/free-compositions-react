import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import HistoryListBase from './../base';
import { HISTORY_TYPE_LOGIN } from '../../../../reducers/history/HistoryTypes';
import { getAllByFilter } from './../../../../reducers/history/HistoryActions';
import { formatDateTime } from '../../../../common/formatters/date';

class LoginsList extends HistoryListBase {
  constructor(props) {
    super(props, HISTORY_TYPE_LOGIN);
  }

  configure() {
    super.configure();
    this.tableColumns = [
      { prop: 'email', label: 'Login', flex: 40 },
      { prop: 'user', label: 'Usuário', flex: 40 },
      { prop: 'createdAt', label: 'Data/Hora', flex: 20, format: formatDateTime }
    ];
  }
}

const mapStateToProps = state => ({ histories: state.histories });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginsList));
