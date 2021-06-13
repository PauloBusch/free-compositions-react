import React from 'react';

import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialize, submit } from 'redux-form';

import moment from 'moment';

import Tabs from '../../../common/tabs';
import TabsContent from '../../../common/tabs/contents';
import TabContent from '../../../common/tabs/contents/content';
import TabsHeader from '../../../common/tabs/headers/index';
import TabHeader from '../../../common/tabs/headers/header';
import TabsController from '../../../common/tabs/controller';
import TabActions from './../../../common/tabs/headers/actions/index';
import TabAction from './../../../common/tabs/headers/actions/action/index';
import LoginsFilter, { DEFAULT_FILTER } from './logins/filter';
import LoginsList from './logins/index';
import TabsFilter from './../../../common/tabs/filters/index';
import TabFilter from './../../../common/tabs/filters/filter';
import { getAllByFilter } from './../../../reducers/history/HistoryActions';

class HistoryListTabs extends TabsController {
  constructor(props) {
    super(props, 'logins');

    this.state = { ...this.state, showFilter: true };
    this.closeSearch = this.closeSearch.bind(this);
    this.openSearch = this.openSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  filters() { }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="logins" current={ this.state.tabActive } title="Logins"/>
          <TabActions>
            <TabAction onClick={ this.openSearch } icon="filter" color="white" title="Filtrar"/>
          </TabActions>
        </TabsHeader>
        <TabsFilter show={ this.state.showFilter }>
          <TabFilter id="logins" current={ this.state.tabActive } onClose={ this.closeSearch }>
            <LoginsFilter onSearch={ this.onSearch }/>
          </TabFilter>
        </TabsFilter>
        <TabsContent>
          <TabContent id="logins" current={ this.state.tabActive }>
            <LoginsList/>
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }

  openSearch() {
    this.setState({ ...this.state, showFilter: true });
  }

  closeSearch() {
    this.props.resetLoginsFilter();
    this.setState({ ...this.state, showFilter: false });
    this.onSearch(DEFAULT_FILTER);
  }

  onSearch(filters) {
    this.props.getAllByFilter({ ...filters });
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, resetLoginsFilter }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(HistoryListTabs));

function resetLoginsFilter() {
  return dispatch => dispatch(initialize('search-logins-from', DEFAULT_FILTER));
}
