// Configuration du Slider
const backgrounds = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
let currentBg = 0;

function changeBackground() {
    const bgContainer = document.getElementById('background-container');
    currentBg = (currentBg + 1) % backgrounds.length;
    
    bgContainer.style.opacity = '0';
    setTimeout(() => {
        bgContainer.style.backgroundImage = `url('${backgrounds[currentBg]}')`;
        bgContainer.style.opacity = '1';
    }, 1000);
}

setInterval(changeBackground, 7000);

// --- Real-Time Clock ---
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('real-time').innerText = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// --- Local Audio Logic ---
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicText = document.getElementById('music-text');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicBtn.classList.add('muted');
        musicText.innerText = 'MUTED';
    } else {
        audio.play().catch(e => console.log("Autoplay blocked"));
        musicBtn.classList.remove('muted');
        musicText.innerText = 'PLAYING';
    }
    isPlaying = !isPlaying;
}

document.body.addEventListener('click', () => {
    if (!isPlaying) toggleMusic();
}, { once: true });

// --- GMod Loading Screen API ---
function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    document.getElementById('server-name').innerText = servername || "VITRUM ROLEPLAY";
    if (steamid) {
        document.getElementById('player-steamid').innerText = steamid;
    }
}

function SetStatusChanged(status) {
    document.getElementById('loading-status').innerText = status;
}

function SetFilesNeeded(needed) { totalFiles = Math.max(1, needed); refreshProgress(); }
function SetFilesRemaining(remaining) { filesRemaining = remaining; refreshProgress(); }
function DownloadingFile(fileName) { document.getElementById('current-file').innerText = "Téléchargement : " + fileName; }

let totalFiles = 100;
let filesRemaining = 100;

function refreshProgress() {
    let progress = Math.floor(((totalFiles - filesRemaining) / totalFiles) * 100);
    if (isNaN(progress)) progress = 0;
    if (progress > 100) progress = 100;
    document.getElementById('progress-bar').style.width = progress + "%";
    document.getElementById('percentage').innerText = progress + "%";
}

function SetPlayerName(name) {
    document.getElementById('player-name').innerText = name.toUpperCase();
}

// Simulation pour le test navigateur
if (!window.gmod && !navigator.userAgent.includes("GMod")) {
    let simProgress = 0;
    setInterval(() => {
        if (simProgress < 100) simProgress += 0.5;
        SetFilesNeeded(100);
        SetFilesRemaining(100 - simProgress);
    }, 100);
    SetPlayerName("Joueur Démo");
}
