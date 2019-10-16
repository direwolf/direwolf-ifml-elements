import { ModelShapePath } from 'direwolf-modeler/model-shape-path.js';

export class IFMLNavigationFlow extends ModelShapePath {

  constructor(id) {
    super(id);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.path.marker('end', 15, 15, function(add) {
      add.path('M0,0 L0,6 L9,3 z').attr({
        markerUnits: 'strokeWidth',
        orient: 'auto'
      });
      this.ref(8, 3);
      this.size(25, 25);
    });

    this.circle = group.circle(20).fill('white').stroke({ width: 1, color: 'black' });

    return group;
  }

  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    let start = this.start;
    this.circle.cx(start[0]);
    this.circle.cy(start[1]);
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);

    event.changes.keys.forEach((value, key) => {
      if (value.action === 'add') {
        if (key === 'start') {
          this.circle.cx(event.currentTarget.get(key)[0]);
          this.circle.cy(event.currentTarget.get(key)[1]);
        }
      } else if (value.action === 'update') {
        if (key === 'start') {
          this.circle.cx(event.currentTarget.get(key)[0]);
          this.circle.cy(event.currentTarget.get(key)[1]);
        }
      }
    });
  }

}
