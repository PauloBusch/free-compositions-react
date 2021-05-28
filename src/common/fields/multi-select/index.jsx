import './multi-select.css';

import React from 'react';

import FieldBase from '../FieldBase';

export default class MultiSelect extends FieldBase {
  constructor(props) {
    super(props);

    this.options = [];
    this.state = { showOptions: false, options: this.getOptions() };
    this.closeInsert = this.closeInsert.bind(this);
    this.saveInsert = this.saveInsert.bind(this);
    this.toggleOption = this.toggleOption.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.onInputNew = this.onInputNew.bind(this);
    addEventListener('click', () => {
      if (this.state.showOptions) this.toggleOptions();
    });
  }

  getOptions() {
    const { insert, object } = this.props;
    const values = this.props.options || [];
    const options = object 
      ? values.map(o => ({ value: o.value, text: o.text, checked: this.isChecked(o), disabled: o.disabled || false }))
      : values.map(o => ({ value: o, text: o, checked: this.isChecked(o) }));
    
    if (insert) {
      options.push({
        icon: 'fas fa-plus',
        value: -1, text: '[Cadastrar]',
        click: () => this.setState({ ...this.state, inserting: true }) 
      });
    }

    return options;
  }

  isChecked(option) {
    const { value } = this.props.input;
    const values = value || [];
    return values.indexOf(option.value) !== -1;
  }

  saveInsert() {
    const { option } = this.state;

    this.setState({ 
      ...this.state,
      inserting: false,
      options: [
        ...this.state.options.filter(o => !o.click), 
        { value: option, text: option, checked: true },
        ...this.state.options.filter(o => o.click)
      ] 
    });
  }

  closeInsert() {
    this.setState({ ...this.state, inserting: false });
  }

  onInputNew(ev) {
    this.setState({ ...this.state, option: ev.target.value });
  }

  field() {
    this.listenOptions();

    if (this.state.inserting) return this.newOption();

    const { input, readOnly } = this.props;
    return (
      <div className="form-control multiselect" disabled={ readOnly } onClick={ this.toggleOptions }>
        <div className="display">
          <div className="placeholder">{ this.getPlaceholder() }</div>
          <i className="fas fa-sort-down"></i>
        </div>
        { this.state.showOptions &&
          <div className="options">
            { this.state.options.map(o => this.option(o)) }
          </div>
        }
        <input type="hiden" 
          disabled={ readOnly } 
          ref={ ref => this.inputRef = ref }
          name={ input.name }
          style={ { display: 'none' } }
          ref={ el => this.fileInput = el }
        />
      </div>
    );
  }

  newOption() {
    return (
      <div className="select-insert">
        <input className="form-control" 
          type={ this.props.type } 
          onChange={ this.onInputNew }
          placeholder={ this.props.placeholder || 'Informe a descrição' }>
        </input>
        { this.props.input.value 
          ? <i title="Salvar" className="fas fa-check" onClick={ this.saveInsert }></i>
          : <i title="Voltar" className="fas fa-times" onClick={ this.closeInsert }></i>
        }
      </div>
    );
  }

  listenOptions() {
    if (this.options.length !== this.props.options.length) {
      this.options = this.props.options;
      this.state = { ...this.state, options: this.getOptions() };
    }
  }

  option(option) {
    const id = `${this.props.input.name}-${option.value}`;
    return (
      <div className={ `option${option.disabled ? ' disabled' : ''}` } key={ option.value } onClick={ ev => ev.stopPropagation() }>
        { !option.click && <input type="checkbox" id={ id } checked={ option.checked } disabled={ option.disabled }
          onChange={ () => this.toggleOption(option) }/> }
        <label htmlFor={ id } className={ option.click ? 'action' : '' } onClick={ option.click }>
          { option.icon && <i className={ option.icon }></i> }
          { option.text }
        </label>
      </div>
    );
  }

  getPlaceholder() {
    const { options } = this.state;
    const selected = options.filter(o => o.checked);
    if (selected.length === 0) return 'Selecione...';
    return selected.map(o => o.text).join(', ');
  }

  toggleOptions(ev) {
    if(ev) ev.stopPropagation();
    this.setState({ ...this.state, showOptions: !this.state.showOptions });
  }

  toggleOption(option) {    
    const { options } = this.state;
    const index = options.findIndex(o => o.value === option.value);

    option.checked = !option.checked;
    options[index] = Object.assign(new Object(), option);
    const selected = options.filter(o => o.checked);
    this.setState({ ...this.state, options: [...options] });
    this.props.input.onChange(selected.length ? selected.map(o => o.value) : null);
  }
}
