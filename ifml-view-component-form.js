import { ModelShapeRect } from 'direwolf-modeler/model-shape-rect.js';
import './ifml-parameter.js';

export class IFMLViewComponentForm extends ModelShapeRect {

  constructor(id, createdLocally, title = 'View Component') {
    super(id, createdLocally);

    this._title = title;
    this._width = 150;
    this._height = 80;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.rect.fill('lightgray').stroke({ width: 1, color: 'black' }).radius(15);

    this.stereotypeNode = group.plain('«Form»').font({'family': 'monospace'}).attr({y:((this._height / 2) - 5), 'text-anchor': 'middle'}).x(this._width / 2);

    this.titleNode = group.plain(this._title).font({'family': 'monospace'}).attr({y:((this._height / 2) + 10), 'text-anchor': 'middle'}).x(this._width / 2);

    /*
    this.titleNode = group.text(function(add) {
      add.tspan('«Form»').newLine();
      add.tspan(this._title).dy(15).dx(-80);
    }).font({'family': 'monospace'}).attr({'text-anchor': 'middle'});
    */

    return group;
  }

  get properties() {
    return Object.assign(super.properties, {
      title: {
        type: String
      }
    });
  }

  modelElementDragOver(modelElementType) {
    return this.acceptsChild(modelElementType);
  }

  _resize() {
    let width = this.width;
    let height = this.height;

    this.stereotypeNode.x(width / 2);
    this.stereotypeNode.attr({y:((height / 2) - 5), 'text-anchor': 'middle'});

    this.titleNode.x(width / 2);
    this.titleNode.attr({y: ((height / 2) + 10)});
  }

  _updateTitle() {
    this.titleNode.plain(this.title).font({'family': 'monospace'}).attr({y:((this.height / 2) + 10), 'text-anchor': 'middle'}).x(this.width / 2);
  }

  showPortOnHover() {
    return true;
  }

  get draggedEdgeType() {
    return 'data-flow';
  }

  acceptsChild(modelElementType) {
    return false;
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
