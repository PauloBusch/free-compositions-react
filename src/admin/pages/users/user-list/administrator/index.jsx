import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import UserListBase from './../base';
import { getAll, remove } from '../../../../../reducers/users/UsersActions';
import { getRouteWithoutParams } from './../../../../../common/router/index';
import { archiveByCompositor } from '../../../../../reducers/musics/MusicsActions';

class UserListAdministrator extends UserListBase {
  constructor(props) {
    super(props, 'Admin');
  }

  goNew() {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/new/Admin`;
    router.push(url);
  }
}


const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, archiveByCompositor, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserListAdministrator));
