var switchBckColorBasedOnScore = (getScore) => {
  switch (parseInt(getScore)) {
    case 0:
      $("body").css("background-color", "red")
      break;
    case 1:
      $("body").css("background-color", "blue")
      break;
    case 2:
      $("body").css("background-color", "yellow")
      break;
    case 3:
      $("body").css("background-color", "green")
      break;
    default:
      $("body").css("background-color", "white")
      break;
  }
}

var findScoreFromResponse = (res) => {
  var score = jsonpath.query(res, "$.apps.target.integrations[?(@.platform=='google_analytics')]")
  console.log("score", score)

  return res.apps.target.integrations.find((integration) => "google_analytics" === integration.platform)
        .scores.find(score => "google_lookaliking_lmh" === score.name).score;
}

$(document).ready(() => {
  console.log("Sending 'view' event...");
  $.ajax({
    type: "POST",
    url: 'https://api.sandbox.blackcrow.ai/v1/events/view',
    data: JSON.stringify({
      'site_name': 'BLACKCROW',
      'page_id': 'home',
      'visitor_id': 'crowmart-user',
      'cart': shoppingCart.getCart()
    }),
    error: (err) => {
      console.log("An error occurred while sending 'view' event...");
      console.error(err);
    },
    success: (res) => {
      console.log("Successfully sent 'view' event.");
      switchBckColorBasedOnScore(findScoreFromResponse(res))
    },
    contentType: 'application/json; charset=UTF-8',
    dataType: 'json'
  });

  console.log("Updating cart items...");
  $('#count .label').html(shoppingCart.totalQuantity());
  $('#total .label').html(shoppingCart.totalPrice());
})