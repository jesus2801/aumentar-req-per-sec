const { waitCustomTime } = require("./functions");

class AnalyticServices {
  async reportGetUsers() {
    await waitCustomTime(300);
    await waitCustomTime(600);
    await waitCustomTime(900);
  }
}

module.exports = new AnalyticServices();
