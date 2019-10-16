import { ModelShapeRect } from 'direwolf-modeler/model-shape-rect.js';

export class IFMLParameter extends ModelShapeRect {

  constructor(id, createdLocally) {
    super(id, createdLocally);

    this._typename = 'Parameter';
    this._title = 'State';
    this._type = 'String';

    this._minWidth = 150;
    this._minHeight = 23;
    this._width = 180;
    this._height = 23;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.rect.stroke({ width: 0.5, color: 'black' }).fill('white');

    let title = '«' + this._typename + '» ' + this._title + ': ' + this._type;
    this.text = group.plain(title).font({family: 'monospace', size: 11, color: 'gray'}).attr({y:((this._height / 2) + 3), 'text-anchor': 'middle'}).x(this._width / 2);

    this.element = group;

    return this.element;
  }

  get properties() {
    return Object.assign(super.properties, {
      typename: {
        type: String
      },
      title: {
        type: String
      },
      type: {
        type: String
      }
    });
  }

  acceptsChild(modelElementType) {
    return false;
  }

  modelElementDragOver(modelElementType) {
    return this.acceptsChild(modelElementType);
  }

  toJSON() {
    let json = super.toJSON();

    json.dataType = 'ifml-parameter';
    json.title = this._title;

    return json;
  }

  _updateTitle() {
    let title = '';
    if (this.typename && (this.typename.length > 0)) {
      title += '«' + this.typename + '» ';
    }
    title += this.title;
    if (this.type && (this.type.length > 0)) {
      title += ': ' + this.type;
    }

    this.text.plain(title).attr({y:((this.height / 2) + 3)}).x(this.width / 2);
  }

  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    // we check for undefined here because otherwise it overwrites changes coming from view-component-list
    if (this._createdLocally && (this.title === undefined)) {
      this.typename = this._typename;
      this.title = this._title;
      this.type = this._type;
    }

    this._updateTitle();
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);

    if (event.type === 'update') {
      this._updateTitle();
      if (['typename', 'title', 'type'].indexOf(event.name) > -1) {
      }
    }
  }

}
