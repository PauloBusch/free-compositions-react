import { Component } from 'react';
import { getRouteWithoutParams } from './../router/index';

export default class TabsController extends Component {
  constructor(props, defaultTab) {
    super(props);

    const currentTab = this.props.router.params.tab || defaultTab;
    this.state = { tabActive: currentTab };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tab) {
    if (this.state.tabActive === tab) return;
    const { router } = this.props;
    this.setState({
      ...this.state,
      tabActive: tab
    });
    router.push(`${getRouteWithoutParams(router)}/${tab}`);
  }
}
