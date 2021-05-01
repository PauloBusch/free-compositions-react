import React, { Component } from 'react';

import { withRouter } from 'react-router';

import Tabs from '../../../../common/tabs';
import TabsContent from '../../../../common/tabs/contents';
import TabContent from '../../../../common/tabs/contents/content';
import TabsHeader from '../../../../common/tabs/headers/index';
import TabHeader from '../../../../common/tabs/headers/header';
import TabsController from '../../../../common/tabs/controller';
import UserListAdministrator from './administrator/index';
import UserListCompositor from './compositor/index';

class UserListTabs extends TabsController {
  constructor(props) {
    super(props, 'compositors');
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="compositors" current={ this.state.tabActive } title="Compositores"/>
          <TabHeader onClick={ this.changeTab } target="admins" current={ this.state.tabActive } title="Administradores"/>
        </TabsHeader>
        <TabsContent>
          <TabContent id="compositors" current={ this.state.tabActive }>
            <UserListCompositor/>
          </TabContent>
          <TabContent id="admins" current={ this.state.tabActive }>
            <UserListAdministrator/>
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }
}

export default withRouter(UserListTabs);
