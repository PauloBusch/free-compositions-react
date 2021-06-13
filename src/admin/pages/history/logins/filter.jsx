import './filter.css';

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { reduxForm, Field, Form, submit } from 'redux-form';

import moment from 'moment';

import Input from './../../../../common/fields/input/Input';
import Row from './../../../../common/row/Row';
import integer from './../../../../common/validators/number/integer';
import minValue from './../../../../common/validators/number/min-value';
import maxValue from './../../../../common/validators/number/max-value';


export const DEFAULT_FILTER = {
  createdAtDate: moment().format('YYYY-MM-DD')
};

class LoginsFilter extends Component {
  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.props.initialize(DEFAULT_FILTER);
  }

  render() {
    const { handleSubmit, onSearch } = this.props;
    return (
      <Form id="search-logins" onKeyPress={this.onKeyPress}
        onSubmit={ handleSubmit(values => onSearch(values, true)) }>
        <Row>
          <Field name="email" type="email" placeholder="Login" autoComplete="off"
            onchange={ this.onChange } component={ Input }
            flex="40"
          />
          <Field name="user" type="text" placeholder="Usuário" autoComplete="off"
            onchange={ this.onChange } component={ Input }
            flex="40"
          />
          <Field name="createdAtDate" type="date" placeholder="Data"
            onchange={ () => this.onChange(0) } component={ Input }
            flex="5"
          />
          <Field name="createdAtHour" type="number" placeholder="Hora"
            onchange={ () => this.onChange(0) } component={ Input }
            validate={ [integer, minValue(0), maxValue(24)] }
            flex="15"
          />
        </Row>
      </Form>
    );
  }

  onChange(time) {
    if (this.searchId) clearTimeout(this.searchId);
    this.searchId = setTimeout(() => this.submit(), Number.isInteger(time) ? time : 500);
  }

  onKeyPress(event) {
    if (event.key === 'Enter') this.submit();
  }

  submit() {
    this.props.dispatch(submit('search-logins-from'));
  }
}


export default reduxForm({ form: 'search-logins-from' })(withRouter(LoginsFilter));
