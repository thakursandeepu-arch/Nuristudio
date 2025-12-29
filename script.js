function getProjects(){
  return JSON.parse(localStorage.getItem("projects")) || [];
}
function saveProjects(p){ localStorage.setItem("projects",JSON.stringify(p)); }
function pid(){ return new URLSearchParams(location.search).get("id"); }

/* CREATE MATCH */
function createProject(){
  let p={
    id:Date.now()+"",
    match:project.value,
    teamA:teamA.value,
    teamB:teamB.value,
    runs:0,wickets:0,balls:0
  };
  let ps=getProjects(); ps.push(p); saveProjects(ps);
  location.href="dashboard.html?id="+p.id;
}

/* LOAD */
function cur(){
  return getProjects().find(x=>x.id===pid());
}
function save(p){
  let ps=getProjects();
  ps[ps.findIndex(x=>x.id===p.id)]=p;
  saveProjects(ps);
}

/* SCORE */
function run(r){ let p=cur(); p.runs+=r; save(p); render(); }
function wicket(){ let p=cur(); p.wickets++; save(p); render(); }
function ball(){ let p=cur(); p.balls++; save(p); render(); }
function resetMatch(){
  let p=cur(); p.runs=0;p.wickets=0;p.balls=0; save(p); render();
}

/* RENDER */
function render(){
  let p=cur(); if(!p)return;
  let overs=Math.floor(p.balls/6)+"."+(p.balls%6);
  if(score) score.innerText=`${p.runs}/${p.wickets}`;
  if(teams) teams.innerText=`${p.teamA} vs ${p.teamB}`;
  if(overs) document.getElementById("overs").innerText=overs+" overs";
  if(liveScore) liveScore.innerText=`${p.runs}/${p.wickets}`;
  if(liveOvers) liveOvers.innerText=overs+" overs";
  if(obsLink)
    obsLink.value=location.origin+"/overlay.html?id="+p.id;
}

/* LIST */
function renderProjectList(){
  let d=document.getElementById("projectList");
  if(!d)return;
  d.innerHTML="";
  getProjects().forEach(p=>{
    d.innerHTML+=`<div>
    <b>${p.match}</b><br>
    ${p.teamA} vs ${p.teamB}<br>
    <button onclick="location.href='dashboard.html?id=${p.id}'">Open</button>
    </div>`;
  });
}

function copyOBSLink(){
  obsLink.select();
  navigator.clipboard.writeText(obsLink.value);
  alert("OBS Link Copied");
}

render();
renderProjectList();
setInterval(render,500);
