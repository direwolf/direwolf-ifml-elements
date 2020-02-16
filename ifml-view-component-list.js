import { ModelShapeRect } from 'direwolf-modeler/model-shape-rect.js';
import './ifml-parameter.js';

export class IFMLViewComponentList extends ModelShapeRect {

  constructor(id, createdLocally, title = 'View Component', width = 200) {
    super(id, createdLocally);

    this._title = title;
    this._minWidth = 150;
    this._width = width;
    this._height = 80;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.rect.fill('lightgray').stroke({ width: 1, color: 'black' }).radius(15);

    this.titleNode = group.plain('«List» ' + this._title).font({family: 'monospace', color: 'gray'}).attr({y: 20, 'text-anchor': 'middle'}).cx(this._width / 2);

    return group;
  }

  showPortOnHover() {
    return true;
  }

  acceptsChild(modelElementType) {
    return (modelElementType === 'ifml-parameter');
  }

  modelElementDragOver(modelElementType) {
    return this.acceptsChild(modelElementType);
  }

  getChildrenArray() {
    let childrenArray = super.getChildrenArray();
    if (this._createdLocally) {

      let modelId = this.direwolfSpace.getFreshId();
      let sharedState = this.direwolfSpace.sharedStates.set(modelId, Y.Map);
      sharedState.set('x', (this._width - 150) / 2);
      sharedState.set('y', this._height / 2);
      sharedState.set('width', 150);
      sharedState.set('height', 23);
      sharedState.set('typename', 'DataBinding');
      sharedState.set('title', 'none');

      let syncedModelNode = {};
      syncedModelNode.dataType = 'ifml-parameter';
      syncedModelNode.id = modelId;
      syncedModelNode.parentId = this.id;

      childrenArray.push(syncedModelNode);
    }

    return childrenArray;
  }

  appendModelChild(modelElement) {
    //this.parameter.element.remove();
    this.parameter = modelElement;
    modelElement.createSVGElement(this.element);
  }

  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);

    if (event.type === 'update') {
      if (event.name === 'width') {
        this.titleNode.attr({x: event.value / 2});
        if (this.parameter) {
          this.parameter.element.cx((event.value - this.parameter.width) / 2);
        }
      }
    }
  }

}
