// ===========================
// JEVEL — script.js
// Language switcher + scroll reveals
// ===========================

// ---- TRANSLATIONS ----
const translations = {
  es: {
    tagline: "Jevel es un sello independiente de música ídish y klezmer.",
    newRelease: "nuevo lanzamiento",
    listenBandcamp: "Escuchar en Bandcamp →",
    releaseDesc: "Una sesión klezmer en Buenos Aires, 2024.",
    listenNow: "Escuchar ahora",
    gameLabel: "el juego",
    gameSubtitle: "komets-aleph — ¡oy vey!",
    gameDesc1: "Inspirado en la <em>folk lid</em> de Mark Markovich Warshawsky, <strong>Oyfn Pripetshik: El Juego</strong> es una manera entretenida de practicar el alef-beys.",
    gameDesc2: "Con tres niveles de dificultad y desafíos personalizables, avanzás a tu ritmo.",
    feat1: "Vocales",
    feat2: "Diptongos",
    feat3: "Consonantes",
    feat4: "Grupos de consonantes",
    feat5: "Finales",
    feat6: "Loshn-Koydesh",
    feat7: "Cuadrada / Cursiva",
    playBtn: "Jugar",
    downloadBtn: "Bajar",
    contactLabel: "Links y contacto",
    footerText: "© 2024 Jevel Discos",
  },
  en: {
    tagline: "Jevel is an independent Yiddish and klezmer music label.",
    newRelease: "new release",
    listenBandcamp: "Listen on Bandcamp →",
    releaseDesc: "A klezmer session in Buenos Aires, 2024.",
    listenNow: "Listen now",
    gameLabel: "the game",
    gameSubtitle: "komets-aleph — oy vey!",
    gameDesc1: "Inspired by the <em>folk lid</em> by Mark Markovich Warshawsky, <strong>Oyfn Pripetshik: The Game</strong> is a fun way to practice the alef-beys.",
    gameDesc2: "With three difficulty levels and customizable challenges, you progress at your own pace.",
    feat1: "Vowels",
    feat2: "Diphthongs",
    feat3: "Consonants",
    feat4: "Consonant clusters",
    feat5: "Finals",
    feat6: "Loshn-Koydesh",
    feat7: "Square / Cursive",
    playBtn: "Play",
    downloadBtn: "Download",
    contactLabel: "Links & contact",
    footerText: "© 2024 Jevel Discos",
  },
  pt: {
    tagline: "Jevel é um selo independente de música ídiche e klezmer.",
    newRelease: "novo lançamento",
    listenBandcamp: "Ouvir no Bandcamp →",
    releaseDesc: "Uma sessão klezmer em Buenos Aires, 2024.",
    listenNow: "Ouvir agora",
    gameLabel: "o jogo",
    gameSubtitle: "komets-aleph — oi vei!",
    gameDesc1: "Inspirado na <em>folk lid</em> de Mark Markovich Warshawsky, <strong>Oyfn Pripetshik: O Jogo</strong> é uma forma divertida de praticar o alef-beys.",
    gameDesc2: "Com três níveis de dificuldade e desafios personalizáveis, você avança no seu ritmo.",
    feat1: "Vogais",
    feat2: "Ditongos",
    feat3: "Consoantes",
    feat4: "Grupos de consoantes",
    feat5: "Finais",
    feat6: "Loshn-Koydesh",
    feat7: "Quadrada / Cursiva",
    playBtn: "Jogar",
    downloadBtn: "Baixar",
    contactLabel: "Links e contato",
    footerText: "© 2024 Jevel Discos",
  }
};

// ---- LANGUAGE SWITCHER ----
function setLanguage(lang) {
  console.log('Setting language to:', lang);
  
  const t = translations[lang];
  
  if (!t) {
    console.error('Language not found:', lang);
    return;
  }

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
      console.log(`Updated ${key}:`, t[key]);
    } else {
      console.warn(`Translation missing for key: ${key}`);
    }
  });

  // Update active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Set document language
  document.documentElement.lang = lang === 'pt' ? 'pt' : lang === 'en' ? 'en' : 'es';
  
  // Save preference to localStorage
  localStorage.setItem('jevel-language', lang);
  
  console.log('Language set successfully');
}

function setupLangSwitcher() {
  console.log('Setting up language switcher');
  
  const buttons = document.querySelectorAll('.lang-btn');
  console.log('Found', buttons.length, 'language buttons');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      console.log('Language button clicked:', lang);
      setLanguage(lang);
    });
  });
  
  // Restore saved language preference
  const savedLang = localStorage.getItem('jevel-language') || 'es';
  console.log('Restoring saved language:', savedLang);
  setLanguage(savedLang);
}

// ---- SCROLL REVEAL ----
function setupReveal() {
  const selectors = [
    '.release-inner',
    '.release-info',
    '.game-text',
    '.game-visual',
    '.contact-item',
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.revealIndex || 0) * 70;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.revealIndex = i % 5;
    observer.observe(el);
  });
}

// ---- COVER PARALLAX TILT ----
function setupTilt() {
  const cover = document.querySelector('.cover-wrap');
  if (!cover) return;

  cover.addEventListener('mousemove', e => {
    const rect = cover.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cover.style.transform = `translate(${-x * 6}px, ${-y * 6}px) rotate(${x * 2}deg)`;
  });

  cover.addEventListener('mouseleave', () => {
    cover.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s';
    cover.style.transform = '';
    setTimeout(() => { cover.style.transition = ''; }, 500);
  });
}

// ---- FOOTER REVEAL ----
function setupFooter() {
  const yiddish = document.querySelector('.footer-yiddish');
  if (!yiddish) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        yiddish.style.transition = 'opacity 1.5s ease';
        yiddish.style.opacity = '0.55';
      }
    });
  }, { threshold: 0.5 });

  observer.observe(yiddish);
}

// ---- AUDIO PLAYER ----
function setupAudio() {
  const btn = document.getElementById('audioPlayBtn');
  const audio = document.getElementById('audioPlayer');
  if (!btn || !audio) return;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => { btn.classList.add('playing'); })
          .catch(err => { console.warn('Audio play failed:', err); });
      } else {
        btn.classList.add('playing');
      }
    } else {
      audio.pause();
      btn.classList.remove('playing');
    }
  });

  audio.addEventListener('ended', () => {
    btn.classList.remove('playing');
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing Jevel...');
  setupLangSwitcher();
  setupReveal();
  setupTilt();
  setupFooter();
  setupAudio();
  console.log('Jevel initialized successfully');
});

// ---- BLOB DOWNLOAD ----
function downloadGame() {
  fetch('oyfnpripetshik.html')
    .then(res => {
      if (!res.ok) throw new Error('File not found');
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'oyfnpripetshik.html';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    })
    .catch(() => {
      alert('No se encontró el archivo oyfnpripetshik.html en el directorio.');
    });
}
