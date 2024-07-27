$(document).ready(function() {
    var targetDate = new Date("2024/8/30 00:00:00").getTime();
    var countdownFunction = setInterval(function() {
        var now = new Date().getTime();
        var distance = targetDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $("#days .number").text(days);
        $("#hours .number").text(hours);
        $("#minutes .number").text(minutes);
        $("#seconds .number").text(seconds);

        if (distance < 0) {
            clearInterval(countdownFunction);
            $("#countdown").html("EXPIRED");
        }
    }, 1000);
});
