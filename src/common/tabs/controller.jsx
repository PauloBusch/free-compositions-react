import { Component } from 'react';

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
    const { pathname } = router.location;
    this.setState({
      ...this.state,
      tabActive: tab
    });
    if (!router.params.tab)
      return router.push(`${pathname}/${tab}`);
    
    const index = pathname.lastIndexOf(`/${router.params.tab}`);
    router.push(`${pathname.substring(0, index)}/${tab}`);
  }
}
