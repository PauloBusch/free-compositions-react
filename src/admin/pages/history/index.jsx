import React from 'react';

import { withRouter } from 'react-router';

import Tabs from '../../../common/tabs';
import TabsContent from '../../../common/tabs/contents';
import TabContent from '../../../common/tabs/contents/content';
import TabsHeader from '../../../common/tabs/headers/index';
import TabHeader from '../../../common/tabs/headers/header';
import TabsController from '../../../common/tabs/controller';
import LoginsList from './logins/index';

class HistoryListTabs extends TabsController {
  constructor(props) {
    super(props, 'logins');
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="logins" current={ this.state.tabActive } title="Logins"/>
        </TabsHeader>
        <TabsContent>
          <TabContent id="logins" current={ this.state.tabActive }>
            <LoginsList/>
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }
}

export default withRouter(HistoryListTabs);
