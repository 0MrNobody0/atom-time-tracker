# atom-time-tracker
[![Dependencies!](https://david-dm.org/Akuma901/atom-time-tracker.svg?style=flat-square)](https://david-dm.org/Akuma901/atom-time-tracker)
[![Installation!](https://img.shields.io/apm/dm/atom-time-tracker.svg?style=flat-square)](https://atom.io/packages/atom-time-tracker)
[![Version!](https://img.shields.io/apm/v/atom-time-tracker.svg?style=flat-square)](https://atom.io/packages/atom-time-tracker)
[![License](https://img.shields.io/apm/l/atom-time-tracker.svg?style=flat-square)](https://github.com/Akuma901/atom-time-tracker/blob/master/LICENSE.md)

[![GitHub stars](https://img.shields.io/github/stars/Akuma901/atom-time-tracker.svg?style=social&label=Star)](https://github.com/Akuma901/atom-time-tracker)
[![GitHub forks](https://img.shields.io/github/forks/Akuma901/atom-time-tracker.svg?style=social&label=Fork)](https://github.com/Akuma901/atom-time-tracker)


### Description
A simple time tracker directly in your editor. Check the time for each project you work on.

### Installation
The time tracker can be installed through Atom. Alternatively, you can use `apm`:

`apm install atom-time-tracker`

### Features
Once the time tracker is started, the time is automatically saved every 60 seconds.

### Settings
After using the time tracker, the time spent on the project is saved in **seconds**. </br>
If you need to modify the worked time or cancel it:

**Settings > Packages > atom-time-tracker > Settings** </br>
![Settings](https://raw.githubusercontent.com/Akuma901/atom-time-tracker/master/images/settings.jpg) </br>
Here you can find the list of the paths of your projects where you use the time tracker. </br>
Paths are created automatically when you use the time tracker in a project. </br>
To remove a path you must delete the seconds and reopen the package setup page. </br>
If necessary you can change the seconds directly from here. </br>
If the path does not appear in the settings (after saving the time tracker at least once) close the Settings window and reopen it. </br>
If the path does not disappear (after deleting the time), close the Settings window and reopen it.


### Tooltip
The tootlip shows the time you have worked on the project.
![tooltip](https://raw.githubusercontent.com/Akuma901/atom-time-tracker/master/images/tooltip.jpg)


### Customization
If you want to change the color of the icon:
#### `.atom-time-tracker`, `.atom-time-tracker-icon.icon-watch` and `.atom-time-tracker-icon.icon-watch.start`
Example:

```scss
.atom-time-tracker-icon.icon-watch {
  color: orange;
}
.atom-time-tracker-icon.icon-watch.start
{
  color: green;
}
```
### Control
To start the timer tracker:
**Packages > Atom Time Tracker >**
- Time Tracker Start
- Time Tracker Stop

Or **context menu >**
- Atom Time Tracker Start
- Atom Time Tracker Stop
