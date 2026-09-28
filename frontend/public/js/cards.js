(() => {
 const $=id=>document.getElementById(id), key='talkeez.pictureCards.v1';
 const defaults=[['Water','💧'],['Snack','🍎'],['Break','🌿'],['Help','🙋'],['All done','✅'],['Bathroom','🚻'],['Read','📖'],['Play','🧸'],['Outside','🌳'],['Quiet time','🌙'],['Happy','😊'],['Sad','😢']].map(([label,symbol],i)=>({id:'default-'+i,label,symbol}));
 let state={version:1,title:'My day',type:'choice',speak:true,custom:[],board:[]};
 const status=text=>{$('card-status').textContent=text;};
 function validate(data){
  if(!data||data.version!==1||typeof data.title!=='string'||data.title.length>70||!['choice','first','schedule'].includes(data.type)||typeof data.speak!=='boolean'||!Array.isArray(data.custom)||data.custom.length>40||!Array.isArray(data.board)||data.board.length>30)throw Error('Invalid board file.');
  const ids=new Set(defaults.map(x=>x.id));
  for(const c of data.custom){if(!c||typeof c.id!=='string'||c.id.length>80||ids.has(c.id)||typeof c.label!=='string'||!c.label.trim()||c.label.length>40||typeof c.symbol!=='string'||c.symbol.length>12|| (c.image && (typeof c.image!=='string'||c.image.length>400000||!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(c.image))))throw Error('Invalid card in backup.');ids.add(c.id);}
  if(data.board.some(id=>!ids.has(id))||(data.type==='first'&&data.board.length>2))throw Error('Invalid board contents.');
  return {version:1,title:data.title,type:data.type,speak:data.speak,custom:data.custom.map(c=>({id:c.id,label:c.label,symbol:c.symbol,...(c.image?{image:c.image}:{})})),board:[...data.board]};
 }
 function save(){try{localStorage.setItem(key,JSON.stringify(state));status('Saved in this browser.');}catch{status('Browser storage is unavailable or full. Download a backup before leaving this page.');}}
 try{const raw=localStorage.getItem(key);if(raw)state=validate(JSON.parse(raw));}catch{status('Saved cards could not be loaded. You can start a board or restore a backup.');}
 const cards=()=>[...defaults,...state.custom];
 function visual(card){const element=document.createElement(card.image?'img':'span');if(card.image){element.src=card.image;element.alt='';}else{element.className='symbol';element.textContent=card.symbol;}return element;}
 function speak(label){if(!state.speak)return;if(!('speechSynthesis'in window)){status('Speech is unavailable in this browser. Picture cards still work.');return;}speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(label);utterance.rate=.9;utterance.onerror=()=>status('Speech could not play. Check your device sound and available voices.');speechSynthesis.speak(utterance);}
 function control(text,aria,action){const button=document.createElement('button');button.type='button';button.className='card-remove';button.textContent=text;button.setAttribute('aria-label',aria);button.onclick=action;return button;}
 function renderBoard(){
  $('board-heading').textContent=state.title.trim()||'My board';$('board').replaceChildren();$('empty-board').hidden=state.board.length>0;
  state.board.forEach((id,index)=>{const card=cards().find(c=>c.id===id),wrap=document.createElement('article');wrap.className='picture-card';
   if(state.type!=='choice'){const step=document.createElement('span');step.className='card-step';step.textContent=state.type==='first'?(index===0?'FIRST':'THEN'):String(index+1);wrap.append(step);}
   const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',card.label);const name=document.createElement('strong');name.textContent=card.label;button.append(visual(card),name);button.onclick=()=>speak(card.label);wrap.append(button);
   const earlier=control('←',`Move ${card.label} earlier`,()=>{[state.board[index-1],state.board[index]]=[state.board[index],state.board[index-1]];save();renderBoard();});earlier.disabled=index===0;
   const later=control('→',`Move ${card.label} later`,()=>{[state.board[index+1],state.board[index]]=[state.board[index],state.board[index+1]];save();renderBoard();});later.disabled=index===state.board.length-1;
   wrap.append(earlier,later,control('Remove',`Remove ${card.label} from board`,()=>{state.board.splice(index,1);save();renderBoard();}));$('board').append(wrap);
  });
 }
 function renderLibrary(){
  $('library').replaceChildren();const query=$('search').value.trim().toLowerCase();
  const filtered=cards().filter(c=>c.label.toLowerCase().includes(query));
  if(!filtered.length){const p=document.createElement('p');p.textContent='No matching cards. Try another word or create your own.';$('library').append(p);}
  filtered.forEach(card=>{const wrapper=document.createElement('div'),button=document.createElement('button');button.type='button';button.className='library-card';button.style.width='100%';button.setAttribute('aria-label','Add '+card.label+' to board');button.append(visual(card),document.createTextNode(card.label));button.onclick=()=>{const limit=state.type==='first'?2:30;if(state.board.length>=limit){status(`This board holds ${limit} cards. Remove a card before adding another.`);return;}state.board.push(card.id);save();renderBoard();};wrapper.append(button);if(state.custom.some(c=>c.id===card.id))wrapper.append(control('Delete',`Delete custom card ${card.label}`,()=>{if(!confirm(`Delete "${card.label}" from the library and board?`))return;state.custom=state.custom.filter(c=>c.id!==card.id);state.board=state.board.filter(id=>id!==card.id);save();renderLibrary();renderBoard();}));$('library').append(wrapper);});
 }
 function loadControls(){$('board-title').value=state.title;$('board-type').value=state.type;$('speak').checked=state.speak;renderBoard();renderLibrary();}
 $('board-title').oninput=()=>{state.title=$('board-title').value;save();renderBoard();};
 $('board-type').onchange=()=>{const next=$('board-type').value;if(next==='first'&&state.board.length>2){if(!confirm('First / Then uses two cards. Keep only the first two cards on this board?')){$('board-type').value=state.type;return;}state.board=state.board.slice(0,2);}state.type=next;save();renderBoard();};
 $('speak').onchange=()=>{state.speak=$('speak').checked;if(!state.speak&&'speechSynthesis'in window)speechSynthesis.cancel();save();};$('search').oninput=renderLibrary;
 $('clear-board').onclick=()=>{if(state.board.length&&!confirm('Remove all cards from this board? Your library will stay available.'))return;state.board=[];save();renderBoard();};
 $('print').onclick=()=>window.print();
 async function photo(file){if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>5*1024*1024)throw Error('Choose a PNG, JPEG, or WebP photo under 5 MB.');const bitmap=await createImageBitmap(file);try{const canvas=document.createElement('canvas'),scale=Math.min(1,400/Math.max(bitmap.width,bitmap.height));canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',.8);}finally{bitmap.close();}}
 $('custom-card').onsubmit=async event=>{event.preventDefault();const label=$('card-label').value.trim();if(!label){status('Please enter a card label.');return;}if(state.custom.length>=40){status('Your library holds up to 40 custom cards. Delete an unused card first.');return;}const button=event.submitter;button.disabled=true;try{const file=$('card-photo').files[0],image=file?await photo(file):null;state.custom.push({id:'custom-'+crypto.randomUUID(),label,symbol:'⭐',...(image?{image}:{})});save();$('custom-card').reset();renderLibrary();}catch(error){status(error.message||'This photo could not be opened. Try another image.');}finally{button.disabled=false;}};
 $('export-board').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='talkeez-picture-board.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Backup downloaded. It includes your custom photos.');};
 $('import-board').onchange=async()=>{const file=$('import-board').files[0];if(!file)return;try{if(file.size>16000000)throw Error('This backup is too large.');const restored=validate(JSON.parse(await file.text()));if(!confirm('Replace this board and custom library with the backup?'))return;state=restored;save();loadControls();}catch(error){status(error.message||'This backup could not be opened.');}finally{$('import-board').value='';}};
 loadControls();
})();
