import './Select.css';

import React from 'react';
import FieldBase from './../FieldBase';

const DEFAULT_STATE = { inserting: false };

export default class Select extends FieldBase {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
    this.onChange = this.onChange.bind(this);
    this.closeInsert = this.closeInsert.bind(this);
  }

  getOptions() {
    const { object, insert } = this.props;
    const options = this.props.options || [];
    const result = object 
      ? options.map(o => ({ value: o.value, text: o.text }))
      : options.map(o => ({ value: o, text: o }));

    if (insert)
      result.push({ value: -1, text: '[Cadastrar]' });
    const { input: { value } } = this.props;
    if (!value)
      result.unshift({ value: '', text: 'Selecione...' });
    return result;
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    if (e.target.value == -1) {
      this.setState({ inserting: true });
      onChange(null);
      return;
    }
    onChange(e.target.value);
  }

  closeInsert() {
    this.setState({ inserting: false });
  }

  field() {
    if (this.state.inserting) { 
      return (
        <div className="select-insert">
          <input { ...this.props.input } 
            className="form-control" 
            type={ this.props.type } 
            placeholder={ this.props.placeholder }>
          </input>
          <i title="Voltar" className="fas fa-times" onClick={ this.closeInsert }></i>
        </div>
      );
    }

    return (
      <select { ...this.props.input } 
        className="form-control" 
        onChange={ this.onChange }
        placeholder={ this.props.placeholder }>
        { this.getOptions().map(o => <option key={ o.value } value={ o.value }>{ o.text }</option>) }
      </select>
    );
  }
}


