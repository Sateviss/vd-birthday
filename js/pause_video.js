
var PLAYER;

function loadVideo(id, startAt, pauseAt, endAt, callwhenready) {
    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    window.onYouTubeIframeAPIReady = function () {
        PLAYER = new YT.Player("ytplayer", {
            "height": "320",
            "width": "640",
            playerVars: { 'controls': 0, 'start': startAt, 'end': endAt },
            "videoId": id,
            "events": {
                "onReady": callwhenready,
                "onStateChange": onPlayerStateChange
            }
        });
    }

    // The API calls this function when the player's state changes.
    function onPlayerStateChange(event) {
        var time, rate, remainingTime;
        if (event.data == YT.PlayerState.PLAYING) {
            time = PLAYER.getCurrentTime();
            // Add .4 of a second to the time in case it's close to the current time
            // (The API kept returning ~9.7 when hitting play after stopping at 10s)
            if (time + .4 < pauseAt) {
                rate = PLAYER.getPlaybackRate();
                remainingTime = (pauseAt - time) / rate;
                setTimeout(conditionalPause, remainingTime * 1000);
            }
        }
    }

    function conditionalPause() {
        time = PLAYER.getCurrentTime();
        if (time + .5 >= pauseAt)
            pauseVideo();
    }
}


function pauseVideo() {
    PLAYER.pauseVideo();
}

function playVideo() {
    PLAYER.playVideo();
}

function seekVideo(to) {
    PLAYER.seekTo(to);
}
