import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, updateOrderBulk, remove } from '../../../../reducers/slides/SlidesActions';
import ListBase from '../../../partials/list-base/ListBase';
import Image from '../../../../common/image/Image';

class SlideList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Slides';
    this.className = 'page-slide-list';
    this.configure();
  }

  confirmRemove() {
    this.toggleLoadingRemove(true);
    this.props.remove(this.state.selected, this.afterRemove);
  }

  getPositionX(raw) {
    if (raw === 'left') return 'Esquerda';
    if (raw === 'center') return 'Centro';
    if (raw === 'right') return 'Direita';
    return '[Nenhum]';
  }

  getPositionY(raw) {
    if (raw === 'top') return 'Topo';
    if (raw === 'center') return 'Centro';
    if (raw === 'bottom') return 'Embaixo';
    return '[Nenhum]';
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'image', label: 'Imagem', flex: 5, template: Image },
      { prop: 'positionX', label: 'Posicionamento Horizontal', flex: 40, format: this.getPositionX },
      { prop: 'positionY', label: 'Posicionamento Vertical', flex: 40, format: this.getPositionY }
    ];
  }
  
  getList() {
    return this.props.slides;
  }
}

const mapStateToProps = state => ({ slides: state.slides });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SlideList));
