'use babel';

import { CompositeDisposable } from 'atom'
export default class AtomTimeTrackerView {

  constructor(statusBar) {
    this.statusBar = statusBar
    this.subscriptions = new CompositeDisposable()
  }

  initialization() {
    this.configuration()
    this.displayElement()
  }

  configuration() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-time-tracker:start': () => this.start(),
      'atom-time-tracker:stop': () => this.stop()
    }))
  }

  displayElement() {
    this.displayStatusBar()
    this.displayTooltipTracker()
  }

  displayStatusBar() {
    this.element = document.createElement('div')
    this.element.classList.add('atom-time-tracker', 'inline-block')

    this.trackerIcon = document.createElement('span')
    this.trackerIcon.classList.add('atom-time-tracker-icon', 'icon', 'icon-watch', 'stop')

    this.element.appendChild(this.trackerIcon)

    this.statusBar.addRightTile({
      item: this.element,
      priority: -500
    })
  }

  start() {
    if(!this.startTracker) {
      this.startTracker = true
      this.setIconTracker(true)
      this.dataStart = this.getDate("YYYY-MM-DD HH:mm:ss")
      this.timer()
      atom.notifications.addSuccess("Time tracker started!")
    } else {
      atom.notifications.addWarning("Time tracker already started!")
    }
  }

  stop() {
    if(this.startTracker) {
      this.startTracker = false
      this.setIconTracker(false)
      this.dataStop = this.getDate("YYYY-MM-DD HH:mm:ss")
      this.clearTimer()
      this.save(false)
      atom.notifications.addSuccess("Time tracker stopped!")
    } else {
      atom.notifications.addWarning("Time tracker already stopped!")
    }
  }

  timer() {
    let interval = 60000
    this.timeout = setTimeout (() =>  {
      this.timer()
      this.save(true)
    }, interval)
  }

  clearTimer() {
    if (this.timeout)
      clearTimeout(this.timeout)
  }

  getDate(format) {
    if (!this.Moment)
      this.Moment = require('moment')

    let moment = this.Moment()
    return moment.format(format)
  }

  getDataTracker() {
    if (!this.Moment)
      this.Moment = require('moment')

    var momentDurationFormatSetup = require("moment-duration-format")
    momentDurationFormatSetup(this.Moment)

    let path = atom.project.getPaths()
    let pathTrackerValue = atom.config.get('atom-time-tracker.' + path)
    let template

    if (!pathTrackerValue || pathTrackerValue == 0) {
      pathTrackerValue = "Not yet!"
      return "Worked: " + pathTrackerValue
    } else {
      switch (true) {
        case (pathTrackerValue < 60):
          template = "s [seconds]"
        break;
        case (pathTrackerValue >= 60 && pathTrackerValue < 3600):
          template = "m [minutes], s [seconds]"
        break;
        case (pathTrackerValue >= 3600 && pathTrackerValue < 86400):
          template = "h [hours], m [minutes], s [seconds]"
        break;
        default:
          template = "h [hours], m [minutes], s [seconds]"
      }
      return "Worked: " + this.Moment.duration(pathTrackerValue, "seconds").format(template)
    }
  }

  setIconTracker(set) {
    if (set)
      this.trackerIcon.classList.add('start')
    else
      this.trackerIcon.classList.remove('start')
  }

  displayTooltipTracker() {
    if (!this.tooltipTracker)
      this.tooltipTracker = atom.tooltips.add(this.trackerIcon, {
        title: () => this.getDataTracker(),
        class: 'atom-time-tracker-tooltip'
      })
  }

  save(set) {
    if(set) {
      this.dataStop = this.getDate("YYYY-MM-DD HH:mm:ss")
    }
    let dataStart = this.Moment(this.dataStart, "YYYY-MM-DD HH:mm:ss");
    let dataStop = this.Moment(this.dataStop, "YYYY-MM-DD HH:mm:ss");
    let difference = dataStop.diff(dataStart, "seconds")
    let path = atom.project.getPaths()
    let pathTrackerValue = atom.config.get('atom-time-tracker.' + path)
    if(!pathTrackerValue) {
      atom.config.set('atom-time-tracker.' + path, difference)
    } else {
      atom.config.set('atom-time-tracker.' + path, pathTrackerValue + difference)
    }
    if(set) {
      this.dataStart = this.dataStop
    }
  }

  destroy() {
    this.clearTimer()
    this.subscriptions.dispose()
    this.tooltipTracker.dispose()
    this.element.remove()
  }

}
