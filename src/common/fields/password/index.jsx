import React from 'react';
import FieldBase from '../FieldBase';

export default class Password extends FieldBase {
  constructor(props) {
    super(props);

    this.togglePassword = this.togglePassword.bind(this);
    this.state = { showPassword: false };
  }

  field() {
    return (
      <input { ...this.props.input } 
        ref={ ref => this.inputRef = ref }
        className="form-control" 
        readOnly={ this.props.readOnly }
        type={ this.state.showPassword ? 'text' : 'password' }
        placeholder={ this.props.placeholder }>
      </input>
    );
  }

  fieldWithIcon() {
    const { icon } = this.props;
    return (
      <div className={ `field-icon-right ${ icon ? 'field-icon' : '' }` }>
        { icon && <i className={ `icon fas fa-${icon}` }></i> }
        { this.field() }
        <i className={ `icon icon-right fas fa-${this.state.showPassword ? 'eye-slash' : 'eye' }` } onClick={ this.togglePassword }></i>
      </div>
    );
  }

  togglePassword() {
    this.setState({
      ...this.state,
      showPassword: !this.state.showPassword
    });
  }
}
