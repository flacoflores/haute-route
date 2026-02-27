// Countdown / status timer for the Haute Route
(function () {
  var el = document.getElementById("countdown");
  if (!el) return;

  var startDate = new Date(el.dataset.start);
  var endDate = new Date(el.dataset.end);

  function update() {
    var now = new Date();
    var label = el.querySelector(".countdown__label");
    var value = el.querySelector(".countdown__value");

    if (now < startDate) {
      // Before the hike — show countdown
      var diff = startDate - now;
      var days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      label.textContent = "Days until departure";
      value.textContent = days + (days === 1 ? " day" : " days");
    } else if (now <= endDate) {
      // During the hike — show current day
      var elapsed = now - startDate;
      var dayNum = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1;
      var totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
      label.textContent = "Currently on the trail";
      value.textContent = "Day " + dayNum + " of " + totalDays;
    } else {
      // After the hike
      label.textContent = "Journey";
      value.textContent = "Completed!";
    }
  }

  update();
  // Update every minute
  setInterval(update, 60000);
})();
