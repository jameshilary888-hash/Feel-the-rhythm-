const PLAYLIST = [{"title": "Skyline Nights", "artist": "Chillwave", "audio": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "cover": "https://images.unsplash.com/photo-1505575967457-2f6a9e24d33a?auto=format&fit=crop&w=800&q=60"}, {"title": "Midnight Pulse", "artist": "SynthFlow", "audio": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", "cover": "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=60"}, {"title": "Rhythm of You", "artist": "Luna Rey", "audio": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", "cover": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=60"}, {"title": "Sunset Groove", "artist": "DJ Nova", "audio": "
let current = 0;
const audio = new Audio();
audio.preload = 'auto';
audio.crossOrigin = 'anonymous';

document.addEventListener('DOMContentLoaded', ()=>{

  const playerBar = document.getElementById('trigaPlayer');
  const coverImg = document.getElementById('trigaCover');
  const titleEl = document.getElementById('trigaTitle');
  const artistEl = document.getElementById('trigaArtist');
  const playBtn = document.getElementById('trigaPlay');
  const prevBtn = document.getElementById('trigaPrev');
  const nextBtn = document.getElementById('trigaNext');
  const eq = document.getElementById('trigaEq');
  const progBar = document.getElementById('trigaProg');

  function loadTrack(i) {
    const t = PLAYLIST[i];
    audio.src = t.audio;
    coverImg.src = t.cover;
    titleEl.textContent = t.title;
    artistEl.textContent = t.artist;
    updateEQ(false);
  }

  function playTrack() {
    audio.play().catch(()=>{});
    playBtn.classList.add('playing');
    playBtn.innerHTML = '⏸';
    playerBar.classList.add('playing');
    updateEQ(true);
  }

  function pauseTrack() {
    audio.pause();
    playBtn.classList.remove('playing');
    playBtn.innerHTML = '▶';
    playerBar.classList.remove('playing');
    updateEQ(false);
  }

  playBtn.addEventListener('click', ()=>{
    if (audio.paused) { playTrack(); } else { pauseTrack(); }
  });

  prevBtn.addEventListener('click', ()=>{
    current = (current - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadTrack(current);
    playTrack();
  });

  nextBtn.addEventListener('click', ()=>{
    current = (current + 1) % PLAYLIST.length;
    loadTrack(current);
    playTrack();
  });

  audio.addEventListener('ended', ()=>{
    nextBtn.click();
  });

  audio.addEventListener('timeupdate', ()=>{
    if(audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progBar.style.width = pct + '%';
    }
  });

  function initTrigaPlayer() {
    if(!document.getElementById('musicSection')) return;
    loadTrack(current);
    function checkHash() {
      if(location.hash.includes('music')) {
        playerBar.style.display = 'flex';
      } else {
        playerBar.style.display = 'none';
        pauseTrack();
      }
    }
    window.addEventListener('hashchange', checkHash);
    checkHash();
  }

  function updateEQ(on) {
    if(on) eq.classList.add('active'); else eq.classList.remove('active');
  }

  // expose
  window.TrigaPlayer = {
    init: initTrigaPlayer,
    load: loadTrack,
    play: playTrack,
    pause: pauseTrack
  };

  initTrigaPlayer();

});
