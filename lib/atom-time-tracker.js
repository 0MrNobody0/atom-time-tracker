'use babel';

import AtomTimeTrackerView from './atom-time-tracker-view';

export default {

  atomTimeTrackerView: null,

  config: {},

  activate(state) {},

  deactivate() {
    if (this.atomTimeTrackerView)
      this.atomTimeTrackerView.destroy();
  },

  consumeStatusBar(statusBar) {
    this.atomTimeTrackerView = new AtomTimeTrackerView(statusBar);
    this.atomTimeTrackerView.initialization()
  }

};
