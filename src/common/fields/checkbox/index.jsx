import './checkbox.css';

import React from 'react';

import FieldBase from './../FieldBase';

export default class Checkbox extends FieldBase {
  render() {
    const { label, className } = this.props;
    const name = this.props.input.name;
    const id = this.props.input.id || name;
    const errors = this.errors();

    return (
      <div 
        className={ `form-field ${errors ? 'has-error' : ''} ${className || ''}` }
        style={ this.getStyle() }
      >
        <div className="field-checkbox"> 
          <input { ...this.props.input } 
            ref={ ref => this.inputRef = ref }
            readOnly={ this.props.readOnly }
            id={ id }
            type="checkbox">
          </input>
          { label ? <label htmlFor={ id }>{ label }</label> : false }
        </div>
        { errors }
      </div>
    );
  }
}
