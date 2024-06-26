import React, { Component } from 'react';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Tabs from '../../../../common/tabs';
import TabsContent from '../../../../common/tabs/contents';
import TabContent from '../../../../common/tabs/contents/content';
import TabsHeader from '../../../../common/tabs/headers/index';
import TabHeader from '../../../../common/tabs/headers/header';
import TabsController from '../../../../common/tabs/controller';
import MusicListPublic from './public';
import MusicListReview from './review/index';
import MusicListPending from './peding/index';
import MusicListArchived from './archived/index';
import MusicListSold from './sold/index';
import MusicListShared from './shared/index';

class MusicListTabs extends TabsController {
  constructor(props) {
    super(props, 'public');
  }

  render() {
    const { user } = this.props;

    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="public" current={ this.state.tabActive } title="Públicas"/>
          { ['Admin', 'Compositor'].indexOf(user.role) !== -1 && <TabHeader onClick={ this.changeTab } target="pending" current={ this.state.tabActive } title="Enviadas"/> }
          { user.role === 'Compositor' && <TabHeader onClick={ this.changeTab } target="review" current={ this.state.tabActive } title="Rejeitadas"/> }
          <TabHeader onClick={ this.changeTab } target="sold" current={ this.state.tabActive } title="Vendidas"/>
          { user.role === 'Admin' && <TabHeader onClick={ this.changeTab } target="archived" current={ this.state.tabActive } title="Arquivadas"/> }
          { user.role === 'Admin' && <TabHeader onClick={ this.changeTab } target="shared" current={ this.state.tabActive } title="Compartilhadas"/> }
        </TabsHeader>
        <TabsContent>
          <TabContent id="public" current={ this.state.tabActive }>
            <MusicListPublic/>
          </TabContent>
          <TabContent id="pending" current={ this.state.tabActive }>
            <MusicListPending/>
          </TabContent>
          <TabContent id="review" current={ this.state.tabActive }>
            <MusicListReview/>
          </TabContent>
          <TabContent id="sold" current={ this.state.tabActive }>
            <MusicListSold/>
          </TabContent>
          <TabContent id="archived" current={ this.state.tabActive }>
            <MusicListArchived/>
          </TabContent>
          <TabContent id="shared" current={ this.state.tabActive }>
            <MusicListShared/>
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });
export default connect(mapStateToProps)(withRouter(MusicListTabs));
