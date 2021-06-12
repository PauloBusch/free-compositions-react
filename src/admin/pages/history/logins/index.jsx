import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import HistoryListBase from './../base';
import { HISTORY_TYPE_LOGIN } from '../../../../reducers/history/HistoryTypes';
import { getAllByFilter } from './../../../../reducers/history/HistoryActions';

class LoginsList extends HistoryListBase {
  constructor(props) {
    super(props, HISTORY_TYPE_LOGIN);
  }
}


const mapStateToProps = state => ({ histories: state.histories });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginsList));
