import { ModelElement } from 'direwolf-modeler/model-element.js';

export class IFMLEvent extends ModelElement {

  constructor(id, createdLocally) {
    super(id, createdLocally);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);
    group.addClass('model-node');

    this.circle = group.circle(20).fill('white').stroke({ width: 1, color: 'black' });

    this.element = group;

    return this.element;
  }

  get properties() {
    return Object.assign(super.properties, {
      x: {
        type: Number
      },
      y: {
        type: Number
      }
    });
  }

  get resizable() {
    return false;
  }

  showPortOnHover() {
    return false;
  }

  get draggedEdgeType() {
    return 'data-flow';
  }

  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    this.element.x(this.x);
    this.element.y(this.y);
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);

    event.keysChanged.forEach((key) => {
      switch (key) {
        case 'x':
          this.element.x(event.target.get(key));
          break;
        case 'y':
            this.element.y(event.target.get(key));
          this.element.transform({y: event.target.get(key)});
          break;
      }
    });
  }

}
