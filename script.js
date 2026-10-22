const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const state = {
  brightness: 100, contrast: 100, saturation: 100, blur: 0, grayscale: false,
  fileName: "", hasMedia: false, isVideo: false
};

const canvas = $("#canvas");
const ctx = canvas.getContext("2d");
const video = $("#video");
const empty = $("#canvasEmpty");
const dropZone = $("#dropZone");
const mediaInput = $("#mediaInput");

function toast(message){
  const el=$("#toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.classList.remove("show"),2200);
}

function applyFilters(){
  state.brightness=+$("#brightness").value;
  state.contrast=+$("#contrast").value;
  state.saturation=+$("#saturation").value;
  state.blur=+$("#blur").value;
  $("#brightnessValue").textContent=state.brightness+"%";
  $("#contrastValue").textContent=state.contrast+"%";
  $("#saturationValue").textContent=state.saturation+"%";
  $("#blurValue").textContent=state.blur+"px";
  drawPreview();
}
["brightness","contrast","saturation","blur"].forEach(id=>$("#"+id).addEventListener("input",applyFilters));

$("#grayscaleBtn").addEventListener("click",()=>{
  state.grayscale=!state.grayscale;
  $("#grayscaleBtn").classList.toggle("active",state.grayscale);
  drawPreview();
});

function filterString(){
  return `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%) blur(${state.blur}px) ${state.grayscale?"grayscale(100%)":""}`;
}

function drawPreview(){
  if(!state.hasMedia) return;
  ctx.save();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.filter=filterString();
  if(state.isVideo && video.readyState>=2){
    const ratio=Math.max(canvas.width/video.videoWidth,canvas.height/video.videoHeight);
    const w=video.videoWidth*ratio,h=video.videoHeight*ratio;
    ctx.drawImage(video,(canvas.width-w)/2,(canvas.height-h)/2,w,h);
  } else if(window.currentImage){
    const ratio=Math.max(canvas.width/window.currentImage.width,canvas.height/window.currentImage.height);
    const w=window.currentImage.width*ratio,h=window.currentImage.height*ratio;
    ctx.drawImage(window.currentImage,(canvas.width-w)/2,(canvas.height-h)/2,w,h);
  }
  ctx.restore();
}

function handleFile(file){
  if(!file || (!file.type.startsWith("image/") && !file.type.startsWith("video/"))){
    toast("Please select an image or video."); return;
  }
  state.fileName=file.name; state.hasMedia=true; state.isVideo=file.type.startsWith("video/");
  $("#mediaStatus").textContent=file.name;
  empty.style.display="none";
  const url=URL.createObjectURL(file);
  if(state.isVideo){
    video.hidden=false; video.src=url; video.load();
    video.onloadedmetadata=()=>{
      $("#timeReadout").textContent="00:00 / "+formatTime(video.duration);
      drawPreview();
    };
    video.ontimeupdate=()=>{
      const pct=(video.currentTime/video.duration)*100||0;
      $("#playhead").style.left=pct+"%";
      $(".track-fill").style.width=pct+"%";
      $("#timeReadout").textContent=formatTime(video.currentTime)+" / "+formatTime(video.duration);
      drawPreview();
    };
  } else {
    video.hidden=true;
    const img=new Image();
    img.onload=()=>{window.currentImage=img;drawPreview()};
    img.src=url;
    $("#timeReadout").textContent="IMAGE / STILL";
  }
  toast("Media loaded — start editing.");
}

function formatTime(sec){
  if(!isFinite(sec)) return "00:00";
  const m=Math.floor(sec/60).toString().padStart(2,"0");
  const s=Math.floor(sec%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

mediaInput.addEventListener("change",e=>handleFile(e.target.files[0]));
["dragenter","dragover"].forEach(ev=>dropZone.addEventListener(ev,e=>{e.preventDefault();dropZone.classList.add("dragover")}));
["dragleave","drop"].forEach(ev=>dropZone.addEventListener(ev,e=>{e.preventDefault();dropZone.classList.remove("dragover")}));
dropZone.addEventListener("drop",e=>handleFile(e.dataTransfer.files[0]));

$("#playBtn").addEventListener("click",()=>{
  if(!state.isVideo){toast("Upload a video to use Play.");return}
  if(video.paused){video.play();$("#playBtn").textContent="❚❚ Pause preview"}
  else{video.pause();$("#playBtn").textContent="▶ Play preview"}
});

$("#resetBtn").addEventListener("click",()=>{
  ["brightness","contrast","saturation","blur"].forEach((id,i)=>$("#"+id).value=[100,100,100,0][i]);
  state.grayscale=false;$("#grayscaleBtn").classList.remove("active");applyFilters();toast("Effects reset.");
});

$("#saveBtn").addEventListener("click",()=>{
  const settings={brightness:state.brightness,contrast:state.contrast,saturation:state.saturation,blur:state.blur,grayscale:state.grayscale};
  localStorage.setItem("jeetEditorSettings",JSON.stringify(settings));
  $("#saveNote").textContent="✓ Saved locally at "+new Date().toLocaleTimeString();
  toast("Edit settings saved locally.");
});

function loadSettings(){
  try{
    const saved=JSON.parse(localStorage.getItem("jeetEditorSettings"));
    if(!saved)return;
    Object.keys(saved).forEach(k=>{if($("#"+k))$("#"+k).value=saved[k]});
    state.grayscale=!!saved.grayscale;
    $("#grayscaleBtn").classList.toggle("active",state.grayscale);
    applyFilters();
  }catch(e){}
}
loadSettings();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

$(".menu-toggle").addEventListener("click",()=>$(".nav").classList.toggle("open"));
$$(".nav a").forEach(a=>a.addEventListener("click",()=>$(".nav").classList.remove("open")));

document.addEventListener("mousemove",e=>{
  const glow=$(".cursor-glow"); glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";
});

$$(".project-card").forEach(card=>card.addEventListener("click",()=>{
  const video = card.querySelector(".project-video");
  if (video) {
    if (video.paused) {
      video.play();
      card.querySelector(".play").textContent = "❚❚";
    } else {
      video.pause();
      card.querySelector(".play").textContent = "▶";
    }
    return;
  }
  toast(`Project ${card.dataset.project} selected — replace this concept with your own reel.`);
}));

const track=document.querySelector(".track");
track.addEventListener("click",e=>{
  if(!state.isVideo)return;
  const rect=track.getBoundingClientRect();
  const pct=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
  video.currentTime=video.duration*pct;
});
