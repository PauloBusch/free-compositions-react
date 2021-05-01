import React, { Component } from 'react';

import Tabs from './../../../../common/tabs';
import TabsContent from './../../../../common/tabs/contents';
import TabContent from './../../../../common/tabs/contents/content';
import TabsHeader from './../../../../common/tabs/headers/index';
import TabHeader from './../../../../common/tabs/headers/header';
import { withRouter } from 'react-router';
import MusicList from './../music-list/MusicList';
import { MUSIC_PENDING, MUSIC_PUBLIC, MUSIC_REVISION } from './../../../../reducers/musics/MusicStatus';
import TabsController from './../../../../common/tabs/controller';
import { connect } from 'react-redux';

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
          { user.role === 'Admin' && <TabHeader onClick={ this.changeTab } target="pending" current={ this.state.tabActive } title="Pendentes"/> }
          { user.role === 'Compositor' && <TabHeader onClick={ this.changeTab } target="review" current={ this.state.tabActive } title="Revisão"/> }
        </TabsHeader>
        <TabsContent>
          <TabContent id="public" current={ this.state.tabActive }>
            <MusicList status={ MUSIC_PUBLIC }/>
          </TabContent>
          <TabContent id="pending" current={ this.state.tabActive }>
            <MusicList status={ MUSIC_PENDING }/>
          </TabContent>
          <TabContent id="review" current={ this.state.tabActive }>
            <MusicList status={ MUSIC_REVISION }/>
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });
export default connect(mapStateToProps)(withRouter(MusicListTabs));
