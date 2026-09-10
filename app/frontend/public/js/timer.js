(() => {
 const $ = id => document.getElementById(id);
 let duration = 300000, remaining = duration, end = 0, running = false, audio;
 const colors = {mint:['#e1ecdf','#5b8b69'],lavender:['#e9e5f2','#8c7caf'],peach:['#f4e3d8','#c08264']};
 function render(){
  const seconds=Math.ceil(remaining/1000);
  $('countdown').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
  const smooth=$('motion').checked&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
  const value=smooth?remaining:Math.ceil(remaining/1000)*1000;
  $('ring').style.setProperty('--progress',Math.min(100,value/duration*100)+'%');
 }
 function chime(){if(!audio||!$('sound').checked)return;const oscillator=audio.createOscillator(),gain=audio.createGain();oscillator.connect(gain);gain.connect(audio.destination);oscillator.frequency.value=523.25;gain.gain.setValueAtTime(0,audio.currentTime);gain.gain.linearRampToValueAtTime(.12,audio.currentTime+.05);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+1);oscillator.start();oscillator.stop(audio.currentTime+1);}
 function tick(){if(running){remaining=Math.max(0,end-Date.now());if(!remaining){running=false;$('start').textContent='Start again';$('timer-state').textContent='All done. Take your time.';chime();}render();}}
 function reset(){running=false;remaining=duration;$('start').textContent='Start timer';$('timer-state').textContent='Ready when you are';render();}
 function configure(){const minutes=Number($('minutes').value);if(!Number.isFinite(minutes)||minutes<.1||minutes>180){$('timer-error').textContent='Choose a duration between 0.1 and 180 minutes.';return false;}$('timer-error').textContent='';duration=Math.round(minutes*60000);reset();return true;}
 $('start').onclick=()=>{if(running){tick();running=false;$('start').textContent=remaining?'Resume timer':'Start again';if(remaining)$('timer-state').textContent='Paused';return;}if(!Number.isFinite(Number($('minutes').value))||!$('minutes').checkValidity()){configure();return;}if(!remaining)remaining=duration;if($('sound').checked){try{audio ||= new (window.AudioContext||window.webkitAudioContext)();audio.resume().catch(()=>{$('timer-error').textContent='Sound is unavailable. The visual timer will still run.';});}catch{$('timer-error').textContent='Sound is unavailable. The visual timer will still run.';}}end=Date.now()+remaining;running=true;$('start').textContent='Pause timer';$('timer-state').textContent='One moment at a time';};
 $('reset').onclick=reset;$('minutes').onchange=configure;
 document.querySelectorAll('[data-minutes]').forEach(button=>button.onclick=()=>{$('minutes').value=button.dataset.minutes;configure();});
 $('activity').oninput=()=>{$('activity-display').textContent=$('activity').value.trim()||'Quiet break';};
 $('theme').onchange=()=>{const [bg,fg]=colors[$('theme').value];$('timer-stage').style.background=bg;$('timer-stage').style.setProperty('--timer-color',fg);};
 $('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('timer-stage').requestFullscreen();}catch{$('timer-error').textContent='Fullscreen is unavailable in this browser. You can still use the timer here.';}};
 setInterval(tick,100);document.addEventListener('visibilitychange',tick);render();
})();
