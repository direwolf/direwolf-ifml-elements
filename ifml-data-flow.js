import { ModelShapePath } from 'direwolf-modeler/model-shape-path.js';

export class IFMLDataFlow extends ModelShapePath {

  constructor(id) {
    super(id);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.path.attr({'stroke-dasharray': '7.5,7.5'});

    return group;
  }

  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);
  }

}
