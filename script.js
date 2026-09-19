const form = document.querySelector("#video-form");
const input = document.querySelector("#youtube-link");

const videoContainer = document.querySelector(".video-container");
const iframe = document.querySelector("#youtube-player");

const emptyMessage = document.querySelector("#empty-message");
const errorMessage = document.querySelector("#error-message");
const videoInfo = document.querySelector("#video-info");


// Extract the YouTube video ID
function extractVideoId(url) {

    const pattern =
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(pattern);

    if (match) {
        return match[1];
    }

    return null;
}


// Load video when form is submitted
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const url = input.value.trim();

    // Clear previous error
    errorMessage.textContent = "";

    // Empty input
    if (url === "") {
        errorMessage.textContent = "Please paste a YouTube link.";
        return;
    }

    // Extract video ID
    const videoId = extractVideoId(url);

    // Invalid URL
    if (!videoId) {
        errorMessage.textContent =
            "Please enter a valid YouTube video link.";
        return;
    }


    // Build YouTube embed URL
    const embedUrl =
        `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`;


    // Load video
    iframe.src = embedUrl;

    iframe.style.display = "block";
    emptyMessage.style.display = "none";


    // Show loaded video ID
    videoInfo.textContent = `Video ID: ${videoId}`;

});