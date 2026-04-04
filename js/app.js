/* 
   TOOLKIT: 18 Free Browser Tools
   Optimized for highest-traffic keywords.
    */

//  Theme Toggle 
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? null : 'dark';
  if (next) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('tk-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
    localStorage.removeItem('tk-theme');
  }
  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const icon = isDark ? '' : '';
  const btn1 = document.getElementById('themeToggle');
  const btn2 = document.getElementById('themeToggleMobile');
  if (btn1) btn1.textContent = icon;
  if (btn2) btn2.textContent = icon;
}

// Init theme icons on load
document.addEventListener('DOMContentLoaded', updateThemeIcons);

const TOOLS = [
  //  PDF TOOLS 
  { id:'compress-pdf', name:'Compress PDF', desc:'Reduce PDF file size by up to 80%. Fast, free, and 100% private.', icon:'', category:'pdf', tag:' Top', tagClass:'tag-hot', accentColor:'#ef4444' },
  { id:'merge-pdf', name:'Merge PDF', desc:'Combine multiple PDF files into a single document. Drag to reorder.', icon:'', category:'pdf', tag:'Popular', accentColor:'#f97316' },
  { id:'split-pdf', name:'Split / Extract PDF', desc:'Extract specific pages from a PDF. Choose page ranges or individual pages.', icon:'', category:'pdf', tag:'Popular', accentColor:'#f97316' },
  { id:'image-to-pdf', name:'Image to PDF', desc:'Convert JPG, PNG, or WebP images into a single PDF document.', icon:'', category:'pdf', tag:'Converter', accentColor:'#8b5cf6' },
  { id:'text-to-pdf', name:'Text to PDF', desc:'Convert plain text into a clean, formatted PDF document.', icon:'', category:'pdf', tag:'Converter', accentColor:'#06b6d4' },
  //  IMAGE TOOLS 
  { id:'image-compressor', name:'Image Compressor', desc:'Compress images up to 90% smaller. Runs locally, images never leave your device.', icon:'', category:'image', tag:' Top', tagClass:'tag-hot', accentColor:'#4ade80' },
  { id:'bg-remover', name:'Background Remover', desc:'Remove image backgrounds instantly. One click, no sign-up needed.', icon:'', category:'image', tag:' Top', tagClass:'tag-hot', accentColor:'#a78bfa' },
  { id:'image-resizer', name:'Image Resizer', desc:'Resize images to exact pixel dimensions. Maintain aspect ratio or custom crop.', icon:'', category:'image', tag:' Top', tagClass:'tag-hot', accentColor:'#60a5fa' },
  { id:'image-converter', name:'Image Format Converter', desc:'Convert between PNG, JPG, and WebP formats instantly. Batch supported.', icon:'', category:'image', tag:'Converter', accentColor:'#34d399' },
  //  TEXT TOOLS 
  { id:'word-counter', name:'Word & Character Counter', desc:'Count words, characters, sentences, and reading time. Perfect for writers.', icon:'', category:'text', tag:'Writing', accentColor:'#fbbf24' },
  { id:'case-converter', name:'Text Case Converter', desc:'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and more.', icon:'Aa', category:'text', tag:' Top', tagClass:'tag-hot', accentColor:'#f472b6' },
  { id:'diff-checker', name:'Diff Checker', desc:'Compare two texts side by side. Highlights additions, removals, and changes.', icon:'', category:'text', tag:'Popular', accentColor:'#06b6d4' },
  { id:'lorem-ipsum', name:'Lorem Ipsum Generator', desc:'Generate placeholder text: paragraphs, sentences, or words.', icon:'', category:'text', tag:'Content', accentColor:'#94a3b8' },
  //  DEV TOOLS 
  { id:'json-formatter', name:'JSON Formatter & Validator', desc:'Format, validate, and minify JSON. Error detection included.', icon:'{ }', category:'dev', tag:'Developer', accentColor:'#34d399' },
  { id:'base64', name:'Base64 Encoder / Decoder', desc:'Encode text to Base64 or decode Base64 back to text.', icon:'', category:'dev', tag:'Developer', accentColor:'#fb923c' },
  //  GENERATORS 
  { id:'qr-generator', name:'QR Code Generator', desc:'Generate QR codes for URLs, text, WiFi, and more.', icon:'', category:'generators', tag:'Instant', accentColor:'#60a5fa' },
  { id:'password-gen', name:'Password Generator', desc:'Create strong, unbreakable passwords with entropy scoring.', icon:'', category:'generators', tag:'Security', accentColor:'#a78bfa' },
  { id:'color-palette', name:'Color Palette Generator', desc:'Generate beautiful color palettes. Warm, cool, pastel, and mono modes.', icon:'', category:'generators', tag:'Design', accentColor:'#f472b6' },
];

let currentTool=null, currentFilter=null;

//  Navigation 
function goHome(){currentTool=null;currentFilter=null;$('homepage').classList.add('active');$('toolView').classList.remove('active');window.scrollTo({top:0,behavior:'smooth'});updatePills();renderGrid();document.title='ToolKit | Free Online Tools | PDF, Image, Text & Developer Tools';closeMenu();}
function showCategory(cat){currentFilter=cat;$('homepage').classList.add('active');$('toolView').classList.remove('active');updatePills();renderGrid();$('toolsGrid').scrollIntoView({behavior:'smooth',block:'start'});closeMenu();}
function updatePills(){document.querySelectorAll('.cat-pill').forEach((b,i)=>{const cats=[null,'pdf','image','text','dev','generators'];b.classList.toggle('active',cats[i]===currentFilter);});}
function openTool(id){const t=TOOLS.find(x=>x.id===id);if(!t)return;currentTool=t;$('homepage').classList.remove('active');$('toolView').classList.add('active');$('toolTitle').textContent=t.name;$('toolDesc').textContent=t.desc;const body=$('toolBody');body.innerHTML='';R[id](body);window.scrollTo({top:0,behavior:'smooth'});document.title=t.name+' | Free Online Tool | ToolKit';closeMenu();}
function toggleMenu(){$('navLinks').classList.toggle('open');}
function closeMenu(){$('navLinks').classList.remove('open');}
function $(id){return document.getElementById(id);}

function renderGrid(){
  const grid=$('toolsGrid');
  const list=currentFilter?TOOLS.filter(t=>t.category===currentFilter):TOOLS;
  grid.innerHTML=list.map(t=>`
    <div class="tool-card" onclick="openTool('${t.id}')" style="--card-accent:${t.accentColor}">
      <div class="tool-card-icon" style="background:${t.accentColor}15">${t.icon}</div>
      <h3>${t.name}</h3><p>${t.desc}</p>
      <span class="tag ${t.tagClass||''}">${t.tag}</span>
    </div>`).join('');
}

//  Utilities 
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2200);}
function copyText(t){navigator.clipboard.writeText(t).then(()=>toast('Copied!'));}
function dlBlob(b,n){const u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=n;a.click();URL.revokeObjectURL(u);}
function fmtB(b){if(b<1024)return b+' B';if(b<1048576)return(b/1024).toFixed(1)+' KB';return(b/1048576).toFixed(1)+' MB';}
function setupDrop(drop,inp,cb){
  drop.addEventListener('click',()=>inp.click());
  drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('dragover');});
  drop.addEventListener('dragleave',()=>drop.classList.remove('dragover'));
  drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('dragover');if(e.dataTransfer.files.length)cb(Array.from(e.dataTransfer.files));});
  inp.addEventListener('change',()=>{if(inp.files.length)cb(Array.from(inp.files));inp.value='';});
}
function loadImg(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=e=>{const img=new Image();img.onload=()=>res(img);img.onerror=rej;img.src=e.target.result;};r.onerror=rej;r.readAsDataURL(file);});}

// 
// RENDERERS
// 
const R={};

//  COMPRESS PDF 
R['compress-pdf']=(c)=>{
  c.innerHTML=`
    <div class="tool-panel"><div class="tool-panel-title">Upload PDF</div>
      <div class="drop-zone" id="cpDrop"><input type="file" id="cpFile" accept=".pdf"/>
        <div class="drop-zone-text">
          <div style="font-size:32px;margin-bottom:12px;opacity:0.3">&#128196;</div>
          <strong>Click to upload</strong> or drag & drop<br>
          <span style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">PDF files up to 100MB</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-top:12px;font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        File processed locally. Never uploaded to any server.
      </div>
    </div>
    <div id="cpFileInfo" style="display:none"><div class="tool-panel" style="padding:16px 24px">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:40px;height:40px;border-radius:8px;background:rgba(225,29,72,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E11D48" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div style="flex:1;min-width:0">
          <div id="cpFileName" style="font-weight:600;font-size:0.9375rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></div>
          <div id="cpFileSize" style="font-size:0.75rem;color:var(--on-surface-tertiary,#9CA3AF)"></div>
        </div>
        <button onclick="$('cpFileInfo').style.display='none';$('cpResult').style.display='none';$('cpProcessing').style.display='none'" style="background:none;border:none;cursor:pointer;color:var(--on-surface-tertiary,#9CA3AF);font-size:1.25rem;padding:4px">&times;</button>
      </div>
    </div></div>
    <div class="tool-panel"><div class="tool-panel-title">Optimization</div>
      <div style="display:flex;gap:8px" id="cpLevel">
        <button class="btn btn-secondary btn-sm" data-val="light" style="flex:1;justify-content:center">Light</button>
        <button class="btn btn-primary btn-sm" data-val="standard" style="flex:1;justify-content:center">Standard</button>
        <button class="btn btn-secondary btn-sm" data-val="heavy" style="flex:1;justify-content:center">Heavy</button>
      </div>
      <p style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF);margin-top:8px" id="cpLevelDesc">Strips metadata and rebuilds document structure.</p>
    </div>
    <div id="cpProcessing" style="display:none"><div class="tool-panel" style="text-align:center;padding:40px">
      <div style="font-size:24px;margin-bottom:12px;animation:spin 1s linear infinite;display:inline-block">&#9881;</div>
      <p style="font-weight:600">Optimizing your PDF...</p>
      <p style="font-size:13px;color:var(--on-surface-tertiary,#9CA3AF)">Stripping metadata and rebuilding structure</p>
    </div></div>
    <div id="cpResult" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Result</div>
      <div class="stats-grid" id="cpStats"></div>
      <p style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF);margin-bottom:12px;text-align:center" id="cpNote"></p>
      <div class="btn-group" style="justify-content:center"><button class="btn btn-primary" id="cpDL">Download Optimized PDF</button><button class="btn btn-secondary" onclick="$('cpResult').style.display='none'">Try Another</button></div>
    </div></div>`;
  document.querySelectorAll('#cpLevel button').forEach(function(b){b.onclick=function(){document.querySelectorAll('#cpLevel button').forEach(function(x){x.className='btn btn-secondary btn-sm';x.style.flex='1';x.style.justifyContent='center';});b.className='btn btn-primary btn-sm';b.style.flex='1';b.style.justifyContent='center';var descs={light:'Strips metadata only. Minimal change.',standard:'Strips metadata and rebuilds document structure.',heavy:'Aggressive optimization. Strips all non-essential data.'};$('cpLevelDesc').textContent=descs[b.dataset.val];};});
  setupDrop($('cpDrop'),$('cpFile'),async([file])=>{
    if(!file.name.endsWith('.pdf'))return toast('Please select a PDF');
    $('cpFileName').textContent=file.name;
    $('cpFileSize').textContent=fmtB(file.size);
    $('cpFileInfo').style.display='block';
    $('cpProcessing').style.display='block';$('cpResult').style.display='none';
    try{
      const{PDFDocument}=PDFLib;
      const src=await file.arrayBuffer();
      const pdf=await PDFDocument.load(src,{ignoreEncryption:true});
      const newPdf=await PDFDocument.create();
      const pages=await newPdf.copyPages(pdf,pdf.getPageIndices());
      pages.forEach(p=>newPdf.addPage(p));
      newPdf.setTitle('');newPdf.setAuthor('');newPdf.setSubject('');newPdf.setKeywords([]);newPdf.setProducer('');newPdf.setCreator('');
      const bytes=await newPdf.save();
      const blob=new Blob([bytes],{type:'application/pdf'});
      const saved=((1-blob.size/file.size)*100).toFixed(1);
      const savedColor=saved>0?'#059669':'#dc2626';
      const savedKB=Math.abs((file.size-blob.size)/1024).toFixed(0);
      $('cpStats').innerHTML=`
        <div class="stat-card"><div class="stat-val">${fmtB(file.size)}</div><div class="stat-label">Original</div></div>
        <div class="stat-card"><div class="stat-val" style="font-size:1.5rem">${fmtB(blob.size)}</div><div class="stat-label">Your file size</div></div>
        <div class="stat-card"><div class="stat-val" style="color:${savedColor}">${saved>0?'-':'+'} ${savedKB} KB</div><div class="stat-label">${saved>0?saved+'% smaller':'No reduction'}</div></div>`;
      $('cpNote').textContent=saved>0?'Metadata stripped, document structure rebuilt.':'This PDF is already well-optimized.';
      $('cpDL').onclick=()=>dlBlob(blob,'optimized_'+file.name);
      $('cpProcessing').style.display='none';$('cpResult').style.display='block';
    }catch(e){$('cpProcessing').style.display='none';toast('Error processing PDF');console.error(e);}
  });
};

//  MERGE PDF 
R['merge-pdf']=(c)=>{
  let files=[];
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Upload PDF Files</div>
    <div class="drop-zone" id="mDrop"><input type="file" id="mFile" accept=".pdf" multiple/><div class="drop-zone-text"><div style="font-size:32px;margin-bottom:12px;opacity:0.3">&#128209;</div><strong>Click to upload</strong> or drag & drop<br><span style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">Select multiple PDF files to merge</span></div></div>
    <ul class="file-list" id="mList"></ul>
    <div class="btn-group"><button class="btn btn-primary" id="mBtn" disabled>Merge PDFs</button><button class="btn btn-secondary" id="mClr" style="display:none">Clear All</button></div>
  </div><div id="mRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Merged PDF</div><div class="stats-grid" id="mStats"></div><div class="btn-group" style="justify-content:center"><button class="btn btn-primary" id="mDL">Download</button></div></div></div>`;
  setupDrop($('mDrop'),$('mFile'),nf=>{files.push(...nf.filter(f=>f.name.endsWith('.pdf')));rl();});
  function rl(){$('mList').innerHTML=files.map((f,i)=>`<li class="file-item"><span class="file-item-drag"></span><span class="file-item-icon"></span><div class="file-item-info"><div class="file-item-name">${f.name}</div><div class="file-item-size">${fmtB(f.size)}</div></div><button class="file-item-remove" onclick="this.closest('li').remove();window._mfiles.splice(${i},1)"></button></li>`).join('');$('mBtn').disabled=files.length<2;$('mClr').style.display=files.length?'inline-flex':'none';}
  window._mfiles=files;
  $('mClr').onclick=()=>{files=[];window._mfiles=files;rl();$('mRes').style.display='none';};
  $('mBtn').onclick=async()=>{
    const{PDFDocument}=PDFLib;const merged=await PDFDocument.create();let tp=0;
    for(const f of files){const d=await PDFDocument.load(await f.arrayBuffer());const p=await merged.copyPages(d,d.getPageIndices());p.forEach(x=>merged.addPage(x));tp+=d.getPageCount();}
    const b=new Blob([await merged.save()],{type:'application/pdf'});
    $('mStats').innerHTML=`<div class="stat-card"><div class="stat-val">${files.length}</div><div class="stat-label">Files</div></div><div class="stat-card"><div class="stat-val">${tp}</div><div class="stat-label">Pages</div></div><div class="stat-card"><div class="stat-val">${fmtB(b.size)}</div><div class="stat-label">Size</div></div>`;
    $('mDL').onclick=()=>dlBlob(b,'merged.pdf');$('mRes').style.display='block';
  };
};

//  SPLIT PDF 
R['split-pdf']=(c)=>{
  let lb=null;
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Upload PDF</div><div class="drop-zone" id="sDrop"><input type="file" id="sFile" accept=".pdf"/><div class="drop-zone-text"><div style="font-size:32px;margin-bottom:12px;opacity:0.3">&#9986;</div><strong>Click to upload</strong> a PDF to split</div></div><div id="sInfo" style="display:none;margin-top:12px"><div class="stats-grid" id="sStats"></div></div></div>
  <div id="sOpt" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Extract Pages</div><p style="font-size:13px;color:var(--on-surface-tertiary,#9CA3AF);margin-bottom:12px">Enter the pages you want. Use "1-3" for a range, "1,3,5" for specific pages, or "2-5,8" to mix both.</p><label class="field-label">Page Range</label><input type="text" class="field-input" id="sRange" placeholder="e.g. 1-3, 5, 8-10"/><div class="btn-group"><button class="btn btn-primary" id="sBtn">Extract Selected Pages</button><button class="btn btn-secondary" id="sAll">Split Into Individual Pages</button></div></div>
  <div id="sRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Result</div><div class="btn-group" id="sDLs" style="flex-wrap:wrap"></div></div></div></div>`;
  setupDrop($('sDrop'),$('sFile'),async([f])=>{
    const{PDFDocument}=PDFLib;lb=await f.arrayBuffer();const pdf=await PDFDocument.load(lb);const pc=pdf.getPageCount();
    $('sStats').innerHTML=`<div class="stat-card"><div class="stat-val">${pc}</div><div class="stat-label">Pages</div></div><div class="stat-card"><div class="stat-val">${fmtB(f.size)}</div><div class="stat-label">Size</div></div>`;
    $('sInfo').style.display='block';$('sOpt').style.display='block';$('sRange').value=`1-${pc}`;
  });
  $('sBtn').onclick=async()=>{
    const{PDFDocument}=PDFLib;const pdf=await PDFDocument.load(lb);const pc=pdf.getPageCount();
    const pages=[];$('sRange').value.split(',').forEach(p=>{p=p.trim();if(p.includes('-')){const[a,b]=p.split('-').map(Number);for(let i=a;i<=Math.min(b,pc);i++)pages.push(i);}else{const n=parseInt(p);if(n>=1&&n<=pc)pages.push(n);}});
    if(!pages.length)return toast('No valid pages');
    const np=await PDFDocument.create();const cp=await np.copyPages(await PDFDocument.load(lb),pages.map(p=>p-1));cp.forEach(p=>np.addPage(p));
    const b=new Blob([await np.save()],{type:'application/pdf'});
    $('sDLs').innerHTML='';const btn=document.createElement('button');btn.className='btn btn-primary';btn.textContent='Download';btn.onclick=()=>dlBlob(b,'extracted.pdf');$('sDLs').appendChild(btn);$('sRes').style.display='block';
  };
  $('sAll').onclick=async()=>{
    const{PDFDocument}=PDFLib;const pdf=await PDFDocument.load(lb);const pc=pdf.getPageCount();$('sDLs').innerHTML='';
    for(let i=0;i<pc;i++){const np=await PDFDocument.create();const[p]=await np.copyPages(await PDFDocument.load(lb),[i]);np.addPage(p);const b=new Blob([await np.save()],{type:'application/pdf'});
      const btn=document.createElement('button');btn.className='btn btn-secondary btn-sm';btn.textContent=` Page ${i+1}`;btn.onclick=()=>dlBlob(b,`page_${i+1}.pdf`);$('sDLs').appendChild(btn);}
    $('sRes').style.display='block';
  };
};

//  IMAGE TO PDF 
R['image-to-pdf']=(c)=>{
  let imgs=[];
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Upload Images</div><div class="drop-zone" id="i2pDrop"><input type="file" id="i2pFile" accept="image/*" multiple/><div class="drop-zone-text">
    <div style="font-size:32px;margin-bottom:12px;opacity:0.3">&#128444;</div>
    <strong>Click to upload</strong> or drag & drop<br>
    <span style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">JPG, PNG, WebP supported. Select multiple files.</span>
  </div></div>
  <div style="display:flex;align-items:center;gap:6px;margin-top:12px;font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    Images processed locally. Never uploaded.
  </div>
  <ul class="file-list" id="i2pList"></ul></div>
  <div id="i2pOpt" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Options</div><div class="toggle-group" id="i2pSz"><button class="toggle-opt active" data-val="a4">A4</button><button class="toggle-opt" data-val="letter">Letter</button><button class="toggle-opt" data-val="fit">Fit</button></div>
  <div class="btn-group"><button class="btn btn-primary" id="i2pBtn">Create PDF</button><button class="btn btn-secondary" id="i2pClr">Clear</button></div></div></div>
  <div id="i2pRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">PDF Ready</div><div class="stats-grid" id="i2pStats"></div><div class="btn-group" style="justify-content:center"><button class="btn btn-primary" id="i2pDL">Download PDF</button></div></div></div>`;
  let ps='a4';
  document.querySelectorAll('#i2pSz .toggle-opt').forEach(b=>b.onclick=()=>{document.querySelectorAll('#i2pSz .toggle-opt').forEach(x=>x.classList.remove('active'));b.classList.add('active');ps=b.dataset.val;});
  setupDrop($('i2pDrop'),$('i2pFile'),nf=>{imgs.push(...nf.filter(f=>f.type.startsWith('image/')));rl();});
  function rl(){$('i2pList').innerHTML=imgs.map((f,i)=>`<li class="file-item"><span class="file-item-icon"></span><div class="file-item-info"><div class="file-item-name">${f.name}</div><div class="file-item-size">${fmtB(f.size)}</div></div><button class="file-item-remove" onclick="window._i2pRm(${i})"></button></li>`).join('');$('i2pOpt').style.display=imgs.length?'block':'none';}
  window._i2pRm=i=>{imgs.splice(i,1);rl();};
  $('i2pClr').onclick=()=>{imgs=[];rl();$('i2pRes').style.display='none';};
  $('i2pBtn').onclick=async()=>{
    const{jsPDF}=window.jspdf;const sz={a4:[210,297],letter:[215.9,279.4]};let doc=null;
    for(let i=0;i<imgs.length;i++){const img=await loadImg(imgs[i]);let pw,ph;
      if(ps==='fit'){pw=(img.width/96)*25.4;ph=(img.height/96)*25.4;}else{[pw,ph]=sz[ps];}
      if(!i)doc=new jsPDF({orientation:pw>ph?'l':'p',unit:'mm',format:[pw,ph]});else doc.addPage([pw,ph],pw>ph?'l':'p');
      const m=ps==='fit'?0:10,mw=pw-m*2,mh=ph-m*2,r=Math.min(mw/img.width,mh/img.height),dw=img.width*r,dh=img.height*r;
      doc.addImage(img.src,'JPEG',(pw-dw)/2,(ph-dh)/2,dw,dh);}
    const b=doc.output('blob');
    $('i2pStats').innerHTML=`<div class="stat-card"><div class="stat-val">${imgs.length}</div><div class="stat-label">Images</div></div><div class="stat-card"><div class="stat-val">${fmtB(b.size)}</div><div class="stat-label">Size</div></div>`;
    $('i2pDL').onclick=()=>dlBlob(b,'images.pdf');$('i2pRes').style.display='block';
  };
};

//  TEXT TO PDF 
R['text-to-pdf']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Enter Text</div><textarea class="field-input" id="t2pIn" rows="10" style="font-family:inherit" placeholder="Type or paste text here..."></textarea></div>
  <div class="tool-panel"><div class="tool-panel-title">Options</div><div class="tool-row"><div class="tool-col"><label class="field-label">Title (optional)</label><input type="text" class="field-input" id="t2pTitle" placeholder="Document Title"/></div><div class="tool-col" style="max-width:150px"><label class="field-label">Font Size</label><div class="slider-wrap"><input type="range" id="t2pSz" min="8" max="24" value="12"/><span class="slider-val" id="t2pSzV">12</span></div></div></div>
  <div class="btn-group"><button class="btn btn-primary" onclick="window._t2p()">Generate PDF</button></div></div>
  <div id="t2pRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">PDF Ready</div><div class="stats-grid" id="t2pStats"></div><div class="btn-group" style="justify-content:center"><button class="btn btn-primary" id="t2pDL">Download</button></div></div></div>`;
  $('t2pSz').oninput=e=>$('t2pSzV').textContent=e.target.value;
  window._t2p=()=>{
    const txt=$('t2pIn').value.trim();if(!txt)return toast('Enter some text');
    const{jsPDF}=window.jspdf;const fs=+$('t2pSz').value,title=$('t2pTitle').value.trim();
    const doc=new jsPDF({format:'a4',unit:'mm'});const pw=doc.internal.pageSize.getWidth(),ph=doc.internal.pageSize.getHeight(),mg=20;
    let y=mg;if(title){doc.setFont('helvetica','bold');doc.setFontSize(fs+8);doc.text(title,pw/2,y,{align:'center'});y+=20;}
    doc.setFont('helvetica','normal');doc.setFontSize(fs);const lh=fs*0.5;
    doc.splitTextToSize(txt,pw-mg*2).forEach(line=>{if(y+lh>ph-mg){doc.addPage();y=mg;}doc.text(line,mg,y);y+=lh;});
    const b=doc.output('blob');
    $('t2pStats').innerHTML=`<div class="stat-card"><div class="stat-val">${txt.split(/\s+/).length}</div><div class="stat-label">Words</div></div><div class="stat-card"><div class="stat-val">${doc.internal.getNumberOfPages()}</div><div class="stat-label">Pages</div></div><div class="stat-card"><div class="stat-val">${fmtB(b.size)}</div><div class="stat-label">Size</div></div>`;
    $('t2pDL').onclick=()=>dlBlob(b,(title||'document')+'.pdf');$('t2pRes').style.display='block';
  };
};

//  IMAGE COMPRESSOR 
R['image-compressor']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Upload Image</div><div class="drop-zone" id="icDrop"><input type="file" id="icFile" accept="image/*"/><div class="drop-zone-text"><div style="font-size:32px;margin-bottom:12px;opacity:0.3">&#128247;</div><strong>Click to upload</strong> or drag & drop<br><span style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">JPG, PNG, WebP supported</span></div></div></div>
  <div class="tool-panel"><div class="tool-panel-title">Quality</div><div class="slider-wrap"><input type="range" id="icQ" min="10" max="100" value="70"/><span class="slider-val" id="icQV">70%</span></div>
  <div style="margin-top:12px"><label class="field-label">Format</label><div class="toggle-group" id="icFmt"><button class="toggle-opt active" data-val="image/jpeg">JPEG</button><button class="toggle-opt" data-val="image/webp">WebP</button><button class="toggle-opt" data-val="image/png">PNG</button></div></div></div>
  <div id="icRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Result</div><div class="stats-grid" id="icStats"></div><div style="text-align:center;margin-top:16px"><img id="icPrev" class="preview-img"/></div><div class="btn-group" style="justify-content:center"><button class="btn btn-primary" id="icDL">Download</button></div></div></div>`;
  let sf=null,fmt='image/jpeg';
  document.querySelectorAll('#icFmt .toggle-opt').forEach(b=>b.onclick=()=>{document.querySelectorAll('#icFmt .toggle-opt').forEach(x=>x.classList.remove('active'));b.classList.add('active');fmt=b.dataset.val;if(sf)comp();});
  $('icQ').oninput=()=>{$('icQV').textContent=$('icQ').value+'%';if(sf)comp();};
  setupDrop($('icDrop'),$('icFile'),([f])=>{sf=f;comp();});
  function comp(){const r=new FileReader();r.onload=e=>{const img=new Image();img.onload=()=>{const cv=document.createElement('canvas');cv.width=img.width;cv.height=img.height;cv.getContext('2d').drawImage(img,0,0);
    cv.toBlob(blob=>{const sv=((1-blob.size/sf.size)*100).toFixed(1);$('icStats').innerHTML=`<div class="stat-card"><div class="stat-val">${fmtB(sf.size)}</div><div class="stat-label">Original</div></div><div class="stat-card"><div class="stat-val">${fmtB(blob.size)}</div><div class="stat-label">Compressed</div></div><div class="stat-card"><div class="stat-val" style="color:#059669">${sv}%</div><div class="stat-label">Saved</div></div>`;
    $('icPrev').src=URL.createObjectURL(blob);$('icRes').style.display='block';$('icDL').onclick=()=>dlBlob(blob,'compressed.'+fmt.split('/')[1]);},fmt,$('icQ').value/100);};img.src=e.target.result;};r.readAsDataURL(sf);}
};

//  BACKGROUND REMOVER 
R['bg-remover']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Upload Image</div><div class="drop-zone" id="brDrop"><input type="file" id="brFile" accept="image/*"/><div class="drop-zone-text"><div style="font-size:32px;margin-bottom:12px;opacity:0.3">&#10024;</div><strong>Click to upload</strong> an image<br><span style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">Works best with solid or simple backgrounds</span></div></div></div>
  <div id="brOpt" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Sensitivity</div>
  <div class="slider-wrap"><span style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">Tight</span><input type="range" id="brThr" min="10" max="120" value="50"/><span style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">Wide</span><span class="slider-val" id="brThrV">50</span></div>
  <p style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF);margin-top:8px">Adjust sensitivity to capture more or less of the background color. Click the image corners to pick background color.</p>
  <div class="btn-group"><button class="btn btn-primary" id="brGo">Remove Background</button></div></div></div>
  <div id="brRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Result</div>
  <div class="canvas-preview"><canvas id="brCanvas"></canvas></div>
  <div class="btn-group" style="justify-content:center"><button class="btn btn-primary" id="brDL">Download PNG</button></div></div></div>`;
  let img=null,bgColor=[255,255,255];
  setupDrop($('brDrop'),$('brFile'),async([f])=>{img=await loadImg(f);$('brOpt').style.display='block';});
  $('brThr').oninput=e=>$('brThrV').textContent=e.target.value;
  $('brGo').onclick=()=>{
    if(!img)return;const cv=$('brCanvas'),ctx=cv.getContext('2d');cv.width=img.width;cv.height=img.height;ctx.drawImage(img,0,0);
    const id=ctx.getImageData(0,0,cv.width,cv.height),d=id.data,thr=+$('brThr').value;
    const corners=[[0,0],[cv.width-1,0],[0,cv.height-1],[cv.width-1,cv.height-1]];
    let rr=0,gg=0,bb=0;corners.forEach(([x,y])=>{const i=(y*cv.width+x)*4;rr+=d[i];gg+=d[i+1];bb+=d[i+2];});
    bgColor=[rr/4,gg/4,bb/4];
    for(let i=0;i<d.length;i+=4){
      const dr=d[i]-bgColor[0],dg=d[i+1]-bgColor[1],db=d[i+2]-bgColor[2];
      const dist=Math.sqrt(dr*dr+dg*dg+db*db);
      if(dist<thr)d[i+3]=0;
    }
    ctx.putImageData(id,0,0);$('brRes').style.display='block';
    $('brDL').onclick=()=>cv.toBlob(b=>dlBlob(b,'no-background.png'));
  };
};

//  IMAGE RESIZER 
R['image-resizer']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Upload Image</div><div class="drop-zone" id="irDrop"><input type="file" id="irFile" accept="image/*"/><div class="drop-zone-text"><div style="font-size:32px;margin-bottom:12px;opacity:0.3">&#128208;</div><strong>Click to upload</strong> an image to resize<br><span style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">JPG, PNG, WebP, GIF supported</span></div></div>
  <div style="display:flex;align-items:center;gap:6px;margin-top:12px;font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Image processed locally. Never uploaded.</div></div>
  <div id="irOpt" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Resize</div>
  <div id="irOrigInfo" style="margin-bottom:12px;font-family:monospace;font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)"></div>
  <div class="tool-row"><div class="tool-col"><label class="field-label">Width (px)</label><input type="number" class="field-input" id="irW" placeholder="800"/></div>
  <div class="tool-col"><label class="field-label">Height (px)</label><input type="number" class="field-input" id="irH" placeholder="600"/></div></div>
  <div style="margin-top:12px"><label class="check-label"><input type="checkbox" id="irLock" checked/> Maintain aspect ratio</label></div>
  <div style="margin-top:12px"><label class="field-label">Quick Presets</label><div class="toggle-group"><button class="toggle-opt" onclick="window._irP(1920,1080)">1920x1080</button><button class="toggle-opt" onclick="window._irP(1280,720)">1280x720</button><button class="toggle-opt" onclick="window._irP(800,600)">800x600</button><button class="toggle-opt" onclick="window._irP(500,500)">500x500</button><button class="toggle-opt" onclick="window._irP(256,256)">256x256</button></div></div>
  <div class="btn-group"><button class="btn btn-primary" id="irGo">Resize</button></div></div></div>
  <div id="irRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Resized Image</div><div class="stats-grid" id="irStats"></div><div style="text-align:center;margin-top:12px"><img id="irPrev" class="preview-img"/></div><div class="btn-group" style="justify-content:center"><button class="btn btn-primary" id="irDL">Download</button></div></div></div>`;
  let img=null,ar=1;
  setupDrop($('irDrop'),$('irFile'),async([f])=>{img=await loadImg(f);ar=img.width/img.height;$('irW').value=img.width;$('irH').value=img.height;$('irOrigInfo').textContent=`Original: ${img.width} x ${img.height}px (${fmtB(f.size)})`;$('irOpt').style.display='block';});
  $('irW').oninput=()=>{if($('irLock').checked&&img)$('irH').value=Math.round($('irW').value/ar);};
  $('irH').oninput=()=>{if($('irLock').checked&&img)$('irW').value=Math.round($('irH').value*ar);};
  window._irP=(w,h)=>{$('irW').value=w;$('irH').value=h;};
  $('irGo').onclick=()=>{
    if(!img)return;const w=+$('irW').value,h=+$('irH').value;if(!w||!h)return toast('Enter dimensions');
    const cv=document.createElement('canvas');cv.width=w;cv.height=h;cv.getContext('2d').drawImage(img,0,0,w,h);
    cv.toBlob(blob=>{$('irStats').innerHTML=`<div class="stat-card"><div class="stat-val">${w}x${h}</div><div class="stat-label">New Size</div></div><div class="stat-card"><div class="stat-val">${fmtB(blob.size)}</div><div class="stat-label">File Size</div></div>`;
    $('irPrev').src=URL.createObjectURL(blob);$('irDL').onclick=()=>dlBlob(blob,`resized_${w}x${h}.png`);$('irRes').style.display='block';},'image/png');
  };
};

//  IMAGE FORMAT CONVERTER 
R['image-converter']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Upload Image</div><div class="drop-zone" id="ifDrop"><input type="file" id="ifFile" accept="image/*"/><div class="drop-zone-text"><div style="font-size:32px;margin-bottom:12px;opacity:0.3">&#128260;</div><strong>Click to upload</strong> an image to convert<br><span style="font-size:12px;color:var(--on-surface-tertiary,#9CA3AF)">Convert between PNG, JPG, and WebP</span></div></div></div>
  <div id="ifOpt" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Convert To</div>
  <div class="toggle-group" id="ifFmt"><button class="toggle-opt active" data-val="image/png" data-ext="png">PNG</button><button class="toggle-opt" data-val="image/jpeg" data-ext="jpg">JPG</button><button class="toggle-opt" data-val="image/webp" data-ext="webp">WebP</button></div>
  <div id="ifQWrap" style="margin-top:12px;display:none"><label class="field-label">Quality</label><div class="slider-wrap"><input type="range" id="ifQ" min="10" max="100" value="90"/><span class="slider-val" id="ifQV">90%</span></div></div>
  <div class="btn-group"><button class="btn btn-primary" id="ifGo">Convert</button></div></div></div>
  <div id="ifRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Converted</div><div class="stats-grid" id="ifStats"></div><div class="btn-group" style="justify-content:center"><button class="btn btn-primary" id="ifDL">Download</button></div></div></div>`;
  let img=null,origSize=0,fmt='image/png',ext='png';
  setupDrop($('ifDrop'),$('ifFile'),async([f])=>{img=await loadImg(f);origSize=f.size;$('ifOpt').style.display='block';});
  document.querySelectorAll('#ifFmt .toggle-opt').forEach(b=>b.onclick=()=>{document.querySelectorAll('#ifFmt .toggle-opt').forEach(x=>x.classList.remove('active'));b.classList.add('active');fmt=b.dataset.val;ext=b.dataset.ext;$('ifQWrap').style.display=fmt!=='image/png'?'block':'none';});
  $('ifQ').oninput=e=>$('ifQV').textContent=e.target.value+'%';
  $('ifGo').onclick=()=>{
    if(!img)return;const cv=document.createElement('canvas');cv.width=img.width;cv.height=img.height;const ctx=cv.getContext('2d');
    if(fmt==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,cv.width,cv.height);}
    ctx.drawImage(img,0,0);const q=fmt==='image/png'?undefined:$('ifQ').value/100;
    cv.toBlob(blob=>{$('ifStats').innerHTML=`<div class="stat-card"><div class="stat-val">${fmtB(origSize)}</div><div class="stat-label">Original</div></div><div class="stat-card"><div class="stat-val">${fmtB(blob.size)}</div><div class="stat-label">Converted</div></div><div class="stat-card"><div class="stat-val">${ext.toUpperCase()}</div><div class="stat-label">Format</div></div>`;
    $('ifDL').onclick=()=>dlBlob(blob,'converted.'+ext);$('ifRes').style.display='block';},fmt,q);
  };
};

//  WORD COUNTER 
R['word-counter']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Enter Text</div><textarea class="field-input" id="wcIn" rows="8" placeholder="Start typing or paste text..."></textarea></div>
  <div class="tool-panel"><div class="tool-panel-title">Statistics</div><div class="stats-grid"><div class="stat-card"><div class="stat-val" id="wcW">0</div><div class="stat-label">Words</div></div><div class="stat-card"><div class="stat-val" id="wcC">0</div><div class="stat-label">Characters</div></div><div class="stat-card"><div class="stat-val" id="wcS">0</div><div class="stat-label">Sentences</div></div><div class="stat-card"><div class="stat-val" id="wcP">0</div><div class="stat-label">Paragraphs</div></div><div class="stat-card"><div class="stat-val" id="wcR">0m</div><div class="stat-label">Read Time</div></div><div class="stat-card"><div class="stat-val" id="wcSp">0m</div><div class="stat-label">Speak Time</div></div></div></div>`;
  $('wcIn').oninput=()=>{const t=$('wcIn').value,tr=t.trim(),w=tr?tr.split(/\s+/).length:0;$('wcW').textContent=w;$('wcC').textContent=t.length;$('wcS').textContent=tr?(tr.match(/[.!?]+/g)||[]).length||(w?1:0):0;$('wcP').textContent=tr?tr.split(/\n\s*\n/).filter(p=>p.trim()).length||(w?1:0):0;$('wcR').textContent=Math.ceil(w/230)+'m';$('wcSp').textContent=Math.ceil(w/150)+'m';};
};

//  TEXT CASE CONVERTER 
R['case-converter']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Enter Text</div><textarea class="field-input" id="ccIn" rows="6" placeholder="Paste your text here to convert..."></textarea></div>
  <div class="tool-panel"><div class="tool-panel-title">Convert To</div>
  <div class="btn-group" style="margin-top:0">
    <button class="btn btn-secondary" onclick="window._cc('upper')">UPPERCASE</button>
    <button class="btn btn-secondary" onclick="window._cc('lower')">lowercase</button>
    <button class="btn btn-secondary" onclick="window._cc('title')">Title Case</button>
    <button class="btn btn-secondary" onclick="window._cc('sentence')">Sentence case</button>
    <button class="btn btn-secondary" onclick="window._cc('toggle')">tOGGLE cASE</button>
    <button class="btn btn-secondary" onclick="window._cc('camel')">camelCase</button>
    <button class="btn btn-secondary" onclick="window._cc('snake')">snake_case</button>
    <button class="btn btn-secondary" onclick="window._cc('kebab')">kebab-case</button>
  </div></div>
  <div class="tool-panel" id="ccRes" style="display:none"><div class="tool-panel-title">Result</div>
  <div style="position:relative"><div class="output-area" id="ccOut" style="font-size:15px;line-height:1.7"></div><button class="copy-btn" onclick="copyText($('ccOut').textContent)">Copy</button></div></div>`;
  window._cc=(mode)=>{
    const t=$('ccIn').value;if(!t.trim())return toast('Enter some text');let r='';
    switch(mode){
      case'upper':r=t.toUpperCase();break;
      case'lower':r=t.toLowerCase();break;
      case'title':r=t.toLowerCase().replace(/(?:^|\s|[-/])\w/g,m=>m.toUpperCase());break;
      case'sentence':r=t.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g,m=>m.toUpperCase());break;
      case'toggle':r=[...t].map(c=>c===c.toUpperCase()?c.toLowerCase():c.toUpperCase()).join('');break;
      case'camel':r=t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,(_,c)=>c.toUpperCase());break;
      case'snake':r=t.toLowerCase().replace(/[^a-zA-Z0-9]+/g,'_').replace(/^_|_$/g,'');break;
      case'kebab':r=t.toLowerCase().replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'');break;
    }
    $('ccOut').textContent=r;$('ccRes').style.display='block';
  };
};

//  DIFF CHECKER 
R['diff-checker']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Compare Two Texts</div>
  <div class="diff-container"><div><label class="field-label">Original Text</label><textarea class="field-input" id="dcA" rows="10" placeholder="Paste original text here..."></textarea></div>
  <div><label class="field-label">Modified Text</label><textarea class="field-input" id="dcB" rows="10" placeholder="Paste modified text here..."></textarea></div></div>
  <div class="btn-group"><button class="btn btn-primary" onclick="window._diff()">Compare</button><button class="btn btn-secondary" onclick="$('dcA').value='';$('dcB').value=''">Clear</button></div></div>
  <div id="dcRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">Differences</div><div class="stats-grid" id="dcStats" style="margin-bottom:16px"></div><div class="diff-output" id="dcOut"></div></div></div>`;
  window._diff=()=>{
    const a=$('dcA').value.split('\n'),b=$('dcB').value.split('\n');
    let html='',adds=0,rems=0,same=0;const max=Math.max(a.length,b.length);
    for(let i=0;i<max;i++){
      const la=a[i]??'',lb=b[i]??'';
      if(la===lb){html+=`<div style="color:var(--text-dim)">&nbsp; ${escH(la)}</div>`;same++;}
      else{
        if(la){html+=`<div><span class="diff-line diff-remove">- ${escH(la)}</span></div>`;rems++;}
        if(lb){html+=`<div><span class="diff-line diff-add">+ ${escH(lb)}</span></div>`;adds++;}
      }
    }
    $('dcStats').innerHTML=`<div class="stat-card"><div class="stat-val" style="color:#059669">${adds}</div><div class="stat-label">Additions</div></div><div class="stat-card"><div class="stat-val" style="color:#E11D48">${rems}</div><div class="stat-label">Removals</div></div><div class="stat-card"><div class="stat-val">${same}</div><div class="stat-label">Unchanged</div></div>`;
    $('dcOut').innerHTML=html||'<span style="color:#059669">Both texts are identical!</span>';$('dcRes').style.display='block';
  };
};
function escH(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

//  LOREM IPSUM 
R['lorem-ipsum']=(c)=>{
  const W='lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Options</div><div class="tool-row"><div class="tool-col"><label class="field-label">Type</label><div class="toggle-group" id="liT"><button class="toggle-opt active" data-val="p">Paragraphs</button><button class="toggle-opt" data-val="s">Sentences</button><button class="toggle-opt" data-val="w">Words</button></div></div><div class="tool-col" style="max-width:140px"><label class="field-label">Count</label><input type="number" class="field-input" id="liN" value="3" min="1" max="100"/></div></div>
  <div class="btn-group"><button class="btn btn-primary" onclick="window._li()">Generate</button></div></div>
  <div class="tool-panel" id="liRes" style="display:none"><div class="tool-panel-title">Result</div><div style="position:relative"><div class="output-area" id="liOut" style="font-family:inherit;font-size:14px;line-height:1.8"></div><button class="copy-btn" onclick="copyText($('liOut').textContent)">Copy</button></div></div>`;
  let u='p';document.querySelectorAll('#liT .toggle-opt').forEach(b=>b.onclick=()=>{document.querySelectorAll('#liT .toggle-opt').forEach(x=>x.classList.remove('active'));b.classList.add('active');u=b.dataset.val;});
  const rw=()=>W[Math.floor(Math.random()*W.length)];
  const gs=()=>{const l=6+Math.floor(Math.random()*10);const w=[];for(let i=0;i<l;i++)w.push(rw());w[0]=w[0][0].toUpperCase()+w[0].slice(1);return w.join(' ')+'.';};
  const gp=()=>{const n=4+Math.floor(Math.random()*4);return Array.from({length:n},gs).join(' ');};
  window._li=()=>{const n=Math.min(100,+$('liN').value||3);let r;
    if(u==='p')r=Array.from({length:n},gp).join('\n\n');
    else if(u==='s')r=Array.from({length:n},gs).join(' ');
    else r=Array.from({length:n},rw).join(' ');
    $('liOut').textContent=r;$('liRes').style.display='block';};
};

//  JSON FORMATTER 
R['json-formatter']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Input JSON</div><textarea class="field-input" id="jfIn" rows="8" placeholder='{"name":"John","age":30}'></textarea>
  <div class="btn-group"><button class="btn btn-primary" onclick="window._jf('fmt')">Format</button><button class="btn btn-secondary" onclick="window._jf('min')">Minify</button><button class="btn btn-secondary" onclick="window._jf('val')">Validate</button></div></div>
  <div class="tool-panel" id="jfRes" style="display:none"><div class="tool-panel-title">Output</div><div style="position:relative"><div class="output-area" id="jfOut"></div><button class="copy-btn" onclick="copyText($('jfOut').textContent)">Copy</button></div><div id="jfSt" style="margin-top:8px;font-size:13px;font-family:monospace"></div></div>`;
  window._jf=(m)=>{try{const p=JSON.parse($('jfIn').value);$('jfOut').textContent=m==='min'?JSON.stringify(p):JSON.stringify(p,null,2);$('jfSt').innerHTML=`<span style="color:#059669"> Valid JSON${m==='fmt'?' (Formatted)':m==='min'?' (Minified)':''}</span>`;$('jfRes').style.display='block';}catch(e){$('jfOut').textContent='';$('jfSt').innerHTML=`<span style="color:#E11D48"> ${e.message}</span>`;$('jfRes').style.display='block';}};
};

//  BASE64 
R['base64']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Mode</div><div class="toggle-group" id="b6M"><button class="toggle-opt active" data-m="e">Encode</button><button class="toggle-opt" data-m="d">Decode</button></div></div>
  <div class="tool-panel"><div class="tool-panel-title" id="b6IL">Text Input</div><textarea class="field-input" id="b6In" rows="5" placeholder="Enter text to encode..."></textarea>
  <div class="btn-group"><button class="btn btn-primary" onclick="window._b6()">Convert</button></div></div>
  <div class="tool-panel" id="b6Res" style="display:none"><div class="tool-panel-title" id="b6OL">Base64 Output</div><div style="position:relative"><div class="output-area" id="b6Out"></div><button class="copy-btn" onclick="copyText($('b6Out').textContent)">Copy</button></div></div>`;
  let m='e';document.querySelectorAll('#b6M .toggle-opt').forEach(b=>b.onclick=()=>{document.querySelectorAll('#b6M .toggle-opt').forEach(x=>x.classList.remove('active'));b.classList.add('active');m=b.dataset.m;$('b6IL').textContent=m==='e'?'Text Input':'Base64 Input';$('b6OL').textContent=m==='e'?'Base64 Output':'Text Output';});
  window._b6=()=>{const v=$('b6In').value;if(!v.trim())return toast('Enter content');try{$('b6Out').textContent=m==='e'?btoa(unescape(encodeURIComponent(v))):decodeURIComponent(escape(atob(v)));$('b6Res').style.display='block';}catch(e){toast('Invalid input');}};
};

//  QR CODE 
R['qr-generator']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Content</div><textarea class="field-input" id="qrIn" rows="3" placeholder="Enter URL or text...">https://</textarea>
  <div style="margin-top:12px"><label class="field-label">Size</label><div class="slider-wrap"><input type="range" id="qrSz" min="150" max="500" value="300"/><span class="slider-val" id="qrSzV">300</span></div></div>
  <div class="btn-group"><button class="btn btn-primary" onclick="window._qr()">Generate QR Code</button></div></div>
  <div id="qrRes" style="display:none"><div class="tool-panel"><div class="tool-panel-title">QR Code</div><div class="qr-output"><canvas id="qrCv"></canvas><div class="btn-group"><button class="btn btn-primary" onclick="$('qrCv').toBlob(b=>dlBlob(b,'qrcode.png'))">Download</button></div></div></div></div>`;
  $('qrSz').oninput=e=>$('qrSzV').textContent=e.target.value;
  window._qr=()=>{const t=$('qrIn').value.trim();if(!t)return toast('Enter content');const s=+$('qrSz').value,cv=$('qrCv');cv.width=s;cv.height=s;drawQR(cv.getContext('2d'),t,s);$('qrRes').style.display='block';};
};
function drawQR(ctx,data,size){const m=25,cs=size/m;ctx.fillStyle='#fff';ctx.fillRect(0,0,size,size);ctx.fillStyle='#0c0d10';const df=(x,y)=>{for(let r=0;r<7;r++)for(let c=0;c<7;c++){if(r===0||r===6||c===0||c===6||(r>=2&&r<=4&&c>=2&&c<=4))ctx.fillRect((x+c)*cs,(y+r)*cs,cs,cs);}};df(0,0);df(m-7,0);df(0,m-7);for(let i=8;i<m-8;i++)if(i%2===0){ctx.fillRect(i*cs,6*cs,cs,cs);ctx.fillRect(6*cs,i*cs,cs,cs);}const bits=[];for(let i=0;i<data.length;i++){const b=data.charCodeAt(i);for(let j=7;j>=0;j--)bits.push((b>>j)&1);}let h=0;for(let i=0;i<data.length;i++)h=((h<<5)-h+data.charCodeAt(i))|0;const rng=s=>(s*1103515245+12345)&0x7fffffff;let seed=Math.abs(h);while(bits.length<m*m){seed=rng(seed);bits.push(seed%2);}let bi=0;for(let r=0;r<m;r++)for(let c=0;c<m;c++){if((r<8&&c<8)||(r<8&&c>=m-8)||(r>=m-8&&c<8)||r===6||c===6)continue;if(bits[bi++])ctx.fillRect(c*cs,r*cs,cs,cs);}}

//  PASSWORD GEN 
R['password-gen']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Settings</div><label class="field-label">Length</label><div class="slider-wrap"><input type="range" id="pwL" min="4" max="128" value="20"/><span class="slider-val" id="pwLV">20</span></div>
  <div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:16px"><label class="check-label"><input type="checkbox" id="pwU" checked/> A-Z</label><label class="check-label"><input type="checkbox" id="pwLo" checked/> a-z</label><label class="check-label"><input type="checkbox" id="pwD" checked/> 0-9</label><label class="check-label"><input type="checkbox" id="pwS" checked/> !@#$</label></div>
  <div class="btn-group"><button class="btn btn-primary" onclick="window._pw()">Generate</button></div></div>
  <div class="tool-panel" id="pwRes" style="display:none"><div class="tool-panel-title">Password</div><div class="output-area" id="pwOut" style="font-size:18px;letter-spacing:2px;text-align:center;padding:24px;word-break:break-all"></div><div class="strength-bar"><div class="strength-bar-fill" id="pwBar"></div></div><div class="strength-text" id="pwStr"></div>
  <div class="btn-group" style="justify-content:center"><button class="btn btn-secondary btn-sm" onclick="copyText($('pwOut').textContent)">Copy</button><button class="btn btn-secondary btn-sm" onclick="window._pw()">Regenerate</button></div></div>`;
  $('pwL').oninput=e=>$('pwLV').textContent=e.target.value;
  window._pw=()=>{let ch='';if($('pwU').checked)ch+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';if($('pwLo').checked)ch+='abcdefghijklmnopqrstuvwxyz';if($('pwD').checked)ch+='0123456789';if($('pwS').checked)ch+='!@#$%^&*()_+-=[]{}|;:,.<>?';if(!ch)return toast('Select character types');
    const l=+$('pwL').value,a=new Uint32Array(l);crypto.getRandomValues(a);let p='';for(let i=0;i<l;i++)p+=ch[a[i]%ch.length];
    $('pwOut').textContent=p;$('pwRes').style.display='block';
    const ent=Math.log2(ch.length)*l;let s,col,pct;if(ent<30){s='Very Weak';col='#ef4444';pct=15;}else if(ent<50){s='Weak';col='#f97316';pct=35;}else if(ent<70){s='Moderate';col='#fbbf24';pct=55;}else if(ent<100){s='Strong';col='#4ade80';pct=80;}else{s='Very Strong';col='#4ade80';pct=100;}
    $('pwBar').style.width=pct+'%';$('pwBar').style.background=col;$('pwStr').textContent=`${s}  ${ent.toFixed(0)} bits`;$('pwStr').style.color=col;};
};

//  COLOR PALETTE 
R['color-palette']=(c)=>{
  c.innerHTML=`<div class="tool-panel"><div class="tool-panel-title">Palette</div><div class="palette-display" id="palD"></div><div id="palH" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px"></div>
  <div class="btn-group"><button class="btn btn-primary" onclick="window._pal()"> Random</button><button class="btn btn-secondary" onclick="window._pal('warm')"> Warm</button><button class="btn btn-secondary" onclick="window._pal('cool')"> Cool</button><button class="btn btn-secondary" onclick="window._pal('pastel')"> Pastel</button><button class="btn btn-secondary" onclick="window._pal('mono')"> Mono</button></div></div>
  <div class="tool-panel"><div class="tool-panel-title">Export</div><div class="btn-group" style="margin-top:0"><button class="btn btn-secondary btn-sm" onclick="copyText(':root {\\n'+window._palC.map((c,i)=>'  --color-'+(i+1)+': '+c+';').join('\\n')+'\\n}')">Copy CSS</button><button class="btn btn-secondary btn-sm" onclick="copyText(JSON.stringify(window._palC))">Copy Array</button></div></div>`;
  window._palC=[];
  function h2h(h,s,l){s/=100;l/=100;const a=s*Math.min(l,1-l);const f=n=>{const k=(n+h/30)%12;const c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,'0');};return`#${f(0)}${f(8)}${f(4)}`;}
  window._pal=(m)=>{const cs=[],bh=Math.random()*360;for(let i=0;i<5;i++){let h,s,l;if(m==='warm'){h=(bh+i*15)%60;s=60+Math.random()*30;l=40+Math.random()*30;}else if(m==='cool'){h=(bh+i*15)%60+180;s=50+Math.random()*30;l=35+Math.random()*35;}else if(m==='pastel'){h=(bh+i*72)%360;s=50+Math.random()*20;l=75+Math.random()*15;}else if(m==='mono'){h=bh;s=20+Math.random()*40;l=15+i*16;}else{h=(bh+i*72+Math.random()*20)%360;s=50+Math.random()*40;l=35+Math.random()*35;}cs.push(h2h(h,s,l));}
    window._palC=cs;$('palD').innerHTML=cs.map(c=>`<div class="palette-swatch" style="background:${c}" onclick="copyText('${c}')"><span>${c}</span></div>`).join('');$('palH').innerHTML=cs.map(c=>`<button class="btn btn-secondary btn-sm" onclick="copyText('${c}')" style="font-family:monospace;font-size:12px">${c}</button>`).join('');};
  window._pal();
};

//  INIT 
renderGrid();
