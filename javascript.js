const btnToggle = document.getElementById("btn-toggle");
const sidebar = document.getElementById("sidebar");
const listItems = document.querySelectorAll(".list-item");
const contentSections = document.querySelectorAll(".content-section");
const goToBlogBtn = document.getElementById("go-to-blog");

// Elemen Media & Login
const bgAudio = document.getElementById("bg-audio");
const bgVideo = document.getElementById("bg-video");
const musicToggle = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");
const loginOverlay = document.getElementById("login-overlay");
const loginForm = document.getElementById("login-form");

let isPlaying = false;

// Memutar Audio
function playAudio() {
  if (!isPlaying) {
    bgAudio.play().then(() => {
      isPlaying = true;
      musicToggle.classList.add("playing");
      musicIcon.className = "bi bi-music-note-beamed";
    }).catch((err) => {
      console.log("Menunggu interaksi pengguna untuk memutar musik:", err);
    });
  }
}

// Memastikan Video Berjalan di Chrome
function ensureVideoPlay() {
  if (bgVideo.paused) {
    bgVideo.play().catch(e => console.log("Video Play Error:", e));
  }
}

// Logika Submit Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginOverlay.classList.add("hidden");
  
  ensureVideoPlay();
  playAudio();
});

// Toggle On/Off Musik
musicToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isPlaying) {
    bgAudio.pause();
    isPlaying = false;
    musicToggle.classList.remove("playing");
    musicIcon.className = "bi bi-volume-mute";
  } else {
    bgAudio.play();
    isPlaying = true;
    musicToggle.classList.add("playing");
    musicIcon.className = "bi bi-music-note-beamed";
  }
});

// Toggle Navigation Sidebar
btnToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Fungsi Perpindahan Tab Menu
function switchTab(targetId) {
  listItems.forEach((item) => {
    if (item.getAttribute("data-target") === targetId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  contentSections.forEach((section) => {
    if (section.id === targetId) {
      section.classList.add("active-content");
    } else {
      section.classList.remove("active-content");
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Handler Navigasi
listItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("data-target");
    switchTab(targetId);
  });
});

if (goToBlogBtn) {
  goToBlogBtn.addEventListener("click", () => {
    switchTab("blog-section");
  });
}

// Fallback Interaksi Halaman
document.body.addEventListener("click", () => {
  ensureVideoPlay();
}, { once: true });
