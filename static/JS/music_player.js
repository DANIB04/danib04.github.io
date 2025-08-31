
    const player = document.getElementById('player');
    const waveCanvas = document.getElementById('audioWave');
    const ctxWave = waveCanvas.getContext('2d');
    let audioCtx, analyzer, freqData, sourceNode, vizId;
    let playlist = [];
    let currentIdx = -1;

    // Ajustar canvas al tamaño
    function resizeWave() {
      waveCanvas.width = waveCanvas.clientWidth * devicePixelRatio;
      waveCanvas.height = waveCanvas.clientHeight * devicePixelRatio;
      ctxWave.scale(devicePixelRatio, devicePixelRatio);
    }
    window.addEventListener('resize', resizeWave);
    resizeWave();

    // Cargar lista de reproducción desde el DOM
    document.querySelectorAll('#track-list .track-entry').forEach(item => {
      const title = item.querySelector('.track-title').textContent;
      const file = item.querySelector('.play-trigger').onclick.toString().match(/'([^']+)'/)[1];
      playlist.push({ title, file });
    });

    // Cargar y reproducir pista
    function loadTrack(filename) {
      currentIdx = playlist.findIndex(t => t.file === filename);
      if (currentIdx === -1) return;
      player.src = `/musica/${filename}`;
      player.play().then(initVisualizer).catch(console.error);
    }

    // Iniciar visualización
    function initVisualizer() {
      if (!audioCtx) {
        audioCtx = new (AudioContext || webkitAudioContext)();
        analyzer = audioCtx.createAnalyser();
        sourceNode = audioCtx.createMediaElementSource(player);
        sourceNode.connect(analyzer);
        analyzer.connect(audioCtx.destination);
        analyzer.fftSize = 2048;
        freqData = new Uint8Array(analyzer.frequencyBinCount);
      }

      cancelAnimationFrame(vizId);

      function render() {
        vizId = requestAnimationFrame(render);
        analyzer.getByteFrequencyData(freqData);

        ctxWave.clearRect(0, 0, waveCanvas.clientWidth, waveCanvas.clientHeight);
        const cx = waveCanvas.clientWidth / 2;
        const cy = waveCanvas.clientHeight / 2;
        const radius = Math.min(cx, cy) * 0.65;
        const bars = 180;
        const angleStep = (Math.PI * 2) / bars;

        for (let i = 0; i < bars; i++) {
          const avgIndex = Math.floor(i * freqData.length / bars);
          const amplitude = freqData[avgIndex] / 255;
          const barHeight = amplitude * 80;

          const angle = i * angleStep;
          const x1 = cx + Math.cos(angle) * radius;
          const y1 = cy + Math.sin(angle) * radius;
          const x2 = cx + Math.cos(angle) * (radius + barHeight);
          const y2 = cy + Math.sin(angle) * (radius + barHeight);

          const hue = (i * 2 + Date.now() / 30) % 360;
          ctxWave.strokeStyle = `hsl(${hue}, 100%, 60%)`;
          ctxWave.lineWidth = 3;
          ctxWave.shadowColor = `hsl(${hue}, 100%, 70%)`;
          ctxWave.shadowBlur = 10;
          ctxWave.beginPath();
          ctxWave.moveTo(x1, y1);
          ctxWave.lineTo(x2, y2);
          ctxWave.stroke();
        }

      
      }
      render();
    }

    // Eventos de audio
    player.addEventListener('ended', () => {
      cancelAnimationFrame(vizId);
      nextTrack();
    });
    player.addEventListener('pause', () => cancelAnimationFrame(vizId));
    player.addEventListener('play', initVisualizer);

    // Controles
    function togglePlayback() {
      player.paused ? player.play() : player.pause();
    }
    function nextTrack() {
      currentIdx = (currentIdx + 1) % playlist.length;
      loadTrack(playlist[currentIdx].file);
    }
    function prevTrack() {
      currentIdx = currentIdx > 0 ? currentIdx - 1 : 0;
      loadTrack(playlist[currentIdx].file);
    }

    function resetPlayer() {
      location.reload();
    }

    // Partículas triangulares
    function createParticles() {
      const container = document.getElementById('particles-zone');
      for (let i = 0; i < 60; i++) {
        const tri = document.createElement('div');
        tri.classList.add('particle-tri');
        tri.style.left = `${Math.random() * 100}vw`;
        tri.style.bottom = '-20px';
        tri.style.opacity = Math.random() * 0.6 + 0.4;
        tri.style.animationDuration = `${Math.random() * 8 + 12}s`;
        tri.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(tri);
      }
    }
    createParticles();
  