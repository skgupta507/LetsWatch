//#region Import
import { playNextEpisode } from "../detail.js";
//#endregion

//#region VideoPlayer Setup
export function setupVideoPlayer() {
    // Set up the video player with configuration
    const playerConfig = {
        controlBar: {
            volumePanel: { inline: false },
        },
    };

    // Add the HLS Quality Selector plugin if not Safari
    if (!isSafari()) {
        playerConfig.plugins = {
            hlsQualitySelector: { displayCurrentQuality: true },
        };
    }

    const player = videojs("videoplayer", playerConfig);

    // Add event listeners for video end events
    player.on("ended", () => playNextEpisode(player));

    // Return the player instance
    return player;
}
//#endregion

//#region Set Volume
export function setVolume(player) {
    // Unmute
    player.muted(false);

    // Load the previously saved volume or set a default
    const savedVolume = localStorage.getItem("volume");
    if (savedVolume !== null) {
        player.volume(savedVolume); // Load saved volume
    } else {
        player.volume(0.5); // Default volume
    }

    // Update and save the volume whenever it changes
    player.on("volumechange", function () {
        if (player.muted()) {
            localStorage.setItem("volume", "0"); // Save as 0 when muted
        } else {
            localStorage.setItem("volume", player.volume().toFixed(2)); // Save volume to 2 decimal places
        }
    });
}
//#endregion

//#region Check if Safari
export function isSafari() {
    var userAgent = navigator.userAgent;
    var isChrome = userAgent.indexOf("Chrome") > -1;
    var isSafari = userAgent.indexOf("Safari") > -1;

    // Chrome's user agent includes both 'Chrome' and 'Safari', so we need to check for Chrome to exclude it.
    if (isChrome && isSafari) return false;
    else if (isSafari) return true;
    else return false;
}
//#endregion
