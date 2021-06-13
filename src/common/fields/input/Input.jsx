import React from 'react';
import FieldBase from '../FieldBase';

export default class Input extends FieldBase {
  field() {
    return (
      <input { ...this.props.input } 
        ref={ ref => this.inputRef = ref }
        className="form-control" 
        readOnly={ this.props.readOnly }
        autoComplete={ this.props.autoComplete }
        onChange={ this.handleOnChange }
        type={ this.props.type } 
        placeholder={ this.props.placeholder }>
      </input>
    );
  }
}
