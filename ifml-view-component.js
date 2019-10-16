import { ModelShapeRect } from 'direwolf-modeler/model-shape-rect.js';

export class IFMLViewComponent extends ModelShapeRect {

  constructor(id, createdLocally, title = 'View Component', width = 150) {
    super(id, createdLocally);

    this._title = title;
    this._minWidth = 120;
    this._minHeight = 60;
    this._width = width;
    this._height = 80;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.rect.fill('lightgray').radius(15);

    this.titleNode = group.plain(this._title).font({'family': 'monospace'}).attr({y:((this._height / 2) + 3), 'text-anchor': 'middle'}).x(this._width / 2);

    return group;
  }

  get properties() {
    return Object.assign(super.properties, {
      title: {
        type: String
      }
    });
  }

  _resize() {
    let width = this.width;
    let height = this.height;
    this.titleNode.x(width / 2);
    this.titleNode.attr({y: ((height / 2) + 3)});
  }

  _updateTitle() {
    this.titleNode.plain(this.title).font({'family': 'monospace'}).attr({y:((this.height / 2) + 3), 'text-anchor': 'middle'}).x(this.width / 2);
  }

  showPortOnHover() {
    return true;
  }

  acceptsChild(modelElementType) {
    return false;
  }

  modelElementDragOver(modelElementType) {
    return this.acceptsChild(modelElementType);
  }


  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    if (this._createdLocally && !this.title) {
      this.title = this._title;
    }

    this._updateTitle();
    this._resize();
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);

    event.changes.keys.forEach((value, key) => {
      if ((value.action === 'add') || (value.action === 'update')) {
        if ((key === 'width') || (key === 'height')) {
          this._resize();
        } else if (key === 'title') {
          this._updateTitle();
        }
      }
    });
  }

}
