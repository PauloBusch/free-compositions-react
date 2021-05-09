import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, remove } from '../../../../../reducers/users/UsersActions';
import { archiveByCompositor } from '../../../../../reducers/musics/MusicsActions';
import UserListBase from './../base';
import { getRouteWithoutParams } from './../../../../../common/router/index';

class UserListCompositor extends UserListBase {
  constructor(props) {
    super(props, 'Compositor');
  }

  goNew() {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/new/Compositor`;
    router.push(url);
  }
}


const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, archiveByCompositor, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserListCompositor));
