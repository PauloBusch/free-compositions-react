import './Table.css';

import React, { Component } from 'react';
import Action from './action/Action';
import Message from './message/Message';
import Loading from '../loading/Loading';
import DragBase from './../drag-base/index';

export default class Table extends DragBase {
  
  render() {
    const { rows, loading } = this.props;
    if (loading)
      return <Loading />;

    if (!rows || !rows.length) 
      return <Message message={ this.props.emptyMessage || 'Nenhum registro encontrado' } />;

    return (
      <div className="table-container">
        <table className="table-grid">
          <thead style={ this.getHeadStyles() }>
            { this.getColumnHeaders() }
          </thead>
          <tbody onDragOver={ this.dragOver }>
            { this.getRowValues() }
          </tbody>
        </table>
      </div>
    );
  }
  
  movedRow(sourceIndex, targetIndex) { 
    const { movedRow } = this.props;
    if (movedRow) movedRow(sourceIndex, targetIndex);
  }

  getColumnHeaders() {
    const { drag, columns, flexAction } = this.props;
    if (!columns || !Array.isArray(columns)) return false;
    const headStyles = this.getHeadStyles();
    const heads = columns.map(c => 
      <th 
        key={ c.prop } 
        style={ { ...headStyles, width: c.flex ? `${c.flex}%` : '' } }
      >
      { c.label }
      </th>
    );
    if (drag) {
      const head = <th key="drag" style={ { ...headStyles, width: '5%', textAlign: 'center' } }>
        <i className="fas fa-sort"></i>
      </th>;
      heads.unshift(head);
    }
    if (this.hasActions()) heads.push(<th key="actions" style={ { ...headStyles, width: `${flexAction || 2 }%` } }>Ações</th>);
    return <tr>{ heads }</tr>;
  }

  getColumnValues(row, index) {
    const { columns, drag, rowClick } = this.props;
    if (!columns || !Array.isArray(columns)) return false;
    const cells = columns.map(c => {
      const raw = row[c.prop];
      const { format, template } = c;
      const Template = template;
      const text = format ? format(raw) : raw;
      const content = template ? <Template row={ row } index={ index } column={ c } text={ text } /> : text;
      return (
        <td key={ c.prop } onDragStart={ e => { e.stopPropagation(); e.preventDefault() } } onClick={ () => rowClick ? rowClick(row) : false }>{ content }</td>
      );
    });

    if (drag) {
      const cell = <td key="drag" className="drag">
        <i className="fas fa-bars"></i>
      </td>;
      cells.unshift(cell);
    } 

    return cells;
  }

  getActionValues(row, index) {
    if (!this.hasActions()) return false;
    const { actions } = this.props;
    return (
      <td>
        { actions.map(a => <Action 
              key={ a.icon || a.title } 
              color={ a.color }
              icon={ a.icon } title={ a.title } 
              onClick={ () => a.click(row, index) }
            />
          ) 
        }
      </td>
    );
  }

  hasActions() {
    const { actions } = this.props;
    return actions && Array.isArray(actions) && actions.length > 0;
  }

  getRowValues() {
    const { rows, drag, rowClick } = this.props;
    if (!rows || !Array.isArray(rows)) return false;
    return rows.map((r, i) => (
      <tr key={ r.id || i } 
        draggable={ drag } 
        onDragStart={ e => this.dragStart(e) }
        onDragEnd={ e => this.dragEnd(e) }
        style={ { cursor: rowClick ? 'pointer' : 'default' } }>
        { this.getColumnValues(r, i) }
        { this.getActionValues(r, i) }
      </tr>
    ));
  }

  getHeadStyles() {
    const { pallet } = this.props;
    if (!pallet) return { };
    return {
      color: pallet.text,
      backgroundColor: pallet.fill
    };
  }
}
