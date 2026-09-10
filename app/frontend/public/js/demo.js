(() => {
 const routines=['Morning check-in','Snack time','Reading together','Movement break'];
 const root=document.getElementById('demo-routines');
 function update(){const done=[...root.querySelectorAll('input:checked')].map(x=>x.value);document.getElementById('demo-progress').textContent=`${done.length} of ${routines.length} activities completed.`;document.getElementById('demo-summary').textContent=done.length?`Today Sam took part in ${done.join(', ').toLowerCase()}.`:'The day is ready to begin.';}
 routines.forEach(text=>{const label=document.createElement('label');label.className='check';const input=document.createElement('input');input.type='checkbox';input.value=text;input.onchange=update;label.append(input,document.createTextNode(text));root.append(label);});
 document.getElementById('demo-form').onsubmit=event=>{event.preventDefault();const input=document.getElementById('demo-note');if(!input.value.trim())return;const li=document.createElement('li');li.textContent=input.value.trim();document.getElementById('demo-notes').append(li);input.value='';};update();
})();
