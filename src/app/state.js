module.exports = {
  list: {
    name: window.list.name || [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][new Date().getDay()] + ' Goals',
    entries: window.list.entries || [],
  },
}
