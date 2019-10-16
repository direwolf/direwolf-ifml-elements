import { ModelShapeRect } from 'direwolf-modeler/model-shape-rect.js';

export class IFMLViewContainer extends ModelShapeRect {

  constructor(id, createdLocally, title = 'View Container') {
    super(id, createdLocally);

    this._title = title;
    this._default = false;
    this._landmark = false;
    this._xor = false;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.rect.fill('white');

    this.titleNode = group.text(add => { add.tspan(this._title).attr({x: 7, y: 15}); }).font({'family': 'monospace'});

    this.line = group.line(0, 23, this._width, 23).stroke({ width: 1, color: 'black' });

    return group;
  }

  get properties() {
    return Object.assign(super.properties, {
      title: {
        type: String
      },
      default: {
        type: Boolean
      },
      landmark: {
        type: Boolean
      },
      xor: {
        type: Boolean
      }
    });
  }

  showPortOnHover() {
    return true;
  }

  get draggedEdgeType() {
    return 'data-flow';
  }

  acceptsChild(modelElementType) {
    return true;
  }

  modelElementDragOver(modelElementType) {
    if (modelElementType) {
      if (this.acceptsChild(modelElementType)) {
        this.rect.stroke({width: 2.5, color: 'red'});
        this.line.stroke({width: 2.5, color: 'red'});
      }
    } else {
      this.rect.stroke({width: 1, color: 'black'});
      this.line.stroke({width: 1, color: 'black'});
    }
  }

  _updateTitle() {
    let title = '';
    if (this.default) {
      title += '[D]';
    }
    if (this.landmark) {
      title += '[L]';
    }
    if (this.xor) {
      title += '[XOR]';
    }
    if (title.length > 0) {
      title += ' ';
    }
    title += this.title;
    this.titleNode.text(add => { add.tspan(title).attr({x: 7, y: 15}); }).font({'family': 'monospace'});
  }

  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    if (this._createdLocally) {
      this.title = this._title;
      this.default = this._default;
      this.landmark = this._landmark;
      this.xor = this._xor;
    }

    this.line.attr({x2: this.width});
    this._updateTitle();
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);

    event.keysChanged.forEach(key => {
      if (key === 'width') {
        this.line.attr({x2: event.target.get(key)});
      } else if (['title', 'default', 'landmark', 'xor'].indexOf(key) > -1) {
        this._updateTitle();
      }
    });
  }

}
