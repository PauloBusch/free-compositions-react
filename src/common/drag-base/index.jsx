import { Component } from 'react';

export default class DragBase extends Component {
  constructor(props) {
    super(props);

    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.movedRow = this.movedRow.bind(this);
  }

  render() { }

  movedRow(sourceIndex, targetIndex) { }

  dragStart(e) {
    this.rowElement = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.rowElement);

    this.sourceIndex = this.getIndex(this.rowElement);
    this.transition = this.rowElement.style.transition;
    this.rowElement.style.transition = 'none';

    const rect = this.rowElement.getBoundingClientRect();
    this.x = e.pageX - rect.left;
    this.y = e.pageY - rect.top;
  }
  
  dragEnd(e) {
    this.targetIndex = this.getIndex(this.rowElement);
    this.placeholder && this.placeholder.parentNode.removeChild(this.placeholder);
    this.isDraggingStarted = false;
  
    this.rowElement.style.removeProperty('top');
    this.rowElement.style.removeProperty('left');
    this.rowElement.style.removeProperty('opacity');
    this.rowElement.style.removeProperty('position');
  
    this.x = null;
    this.y = null;
    this.rowElement = null;
    this.movedRow(this.sourceIndex, this.targetIndex);
  }
  
  dragOver(e) {
    const rect = this.rowElement.getBoundingClientRect();

    if (!this.isDraggingStarted) {
      this.isDraggingStarted = true;

      this.placeholder = document.createElement('div');
      this.rowElement.parentNode.insertBefore(
        this.placeholder,
        this.rowElement.nextSibling
      );

      this.placeholder.style.height = `${rect.height}px`;
    }
    
    const prevRowElement = this.rowElement.previousElementSibling;
    if (prevRowElement && this.isAbove(this.rowElement, prevRowElement)) {
      this.swap(this.placeholder, this.rowElement);
      this.swap(this.placeholder, prevRowElement);
      return;
    }
  
    const nextRowElement = this.placeholder.nextElementSibling;
    if (nextRowElement && this.isAbove(nextRowElement, this.rowElement)) {
      this.swap(nextRowElement, this.placeholder);
      this.swap(nextRowElement, this.rowElement);
    }
  
    this.rowElement.style.opacity = 0;
    this.rowElement.style.position = 'absolute';
    this.rowElement.style.top = `${e.pageY - this.y}px`; 
    this.rowElement.style.left = `${e.pageX - this.x}px`;
  }

  getIndex(rowElement) {
    let index = 0;
    for (const row of rowElement.parentNode.children) {
      if (rowElement === row) return index;
      index++;
    }
    return -1;
  }
  
  isAbove(firstElement, secondElement) {
    const rectFirst = firstElement.getBoundingClientRect();
    const rectSecond = secondElement.getBoundingClientRect();

    return rectFirst.top + rectFirst.height / 2 < rectSecond.top + rectSecond.height / 2;
  }

  swap(firstElement, secondElement) {
    const parentFirst = firstElement.parentNode;
    const siblingFirst = firstElement.nextSibling === secondElement 
      ? firstElement : firstElement.nextSibling;
  
    secondElement.parentNode.insertBefore(firstElement, secondElement);
    parentFirst.insertBefore(secondElement, siblingFirst);
  }
}
