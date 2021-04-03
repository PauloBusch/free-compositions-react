import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, remove } from '../../../../reducers/letters/LettersActions';
import ListBase from '../../../partials/list-base/ListBase';

class LetterList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Letras';
    this.className = 'page-letter-list';
    this.configure();
  }

  resumeLetter(props) {
    const { letter } = props.row;
    const limit = 180;
    if (letter.length > limit) 
      return <span>{letter.substr(0, limit - 3)}...</span>;
    return <span>{letter}</span>;
  }

  configure() {
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 20 },
      { prop: 'compositor', label: 'Compositor', flex: 20 },
      { prop: 'genre', label: 'Gênero', flex: 20 },
      { prop: 'letter', label: 'Resumo', flex: 60, template: this.resumeLetter }
    ];
    this.tablePallet = {
      text: 'black',
      fill: '#007bff57'
    };
  }
  
  getList() {
    return this.props.letters;
  }
}

const mapStateToProps = state => ({ letters: state.letters });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LetterList));
