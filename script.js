/* ===== NURI STUDIO – FINAL CRICKET SYSTEM (CREATE MATCH FIXED) ===== */

/* ---------- STORAGE ---------- */
function getProjects(){
  return JSON.parse(localStorage.getItem("projects")) || [];
}
function saveProjects(p){
  localStorage.setItem("projects", JSON.stringify(p));
}
function pid(){
  return new URLSearchParams(location.search).get("id");
}

/* ---------- CREATE MATCH (IMPORTANT FIX) ---------- */
function createProject(){
  const match = document.getElementById("project").value;
  const teamA = document.getElementById("teamA").value;
  const teamB = document.getElementById("teamB").value;

  if(!match || !teamA || !teamB){
    alert("Please fill all fields");
    return;
  }

  const projects = getProjects();

  const newProject = {
    id: Date.now().toString(),
    match: match,
    teamA: teamA,
    teamB: teamB,
    runs: 0,
    wickets: 0,
    balls: 0
  };

  projects.push(newProject);
  saveProjects(projects);

  // open dashboard of new match
  window.location.href = "dashboard.html?id=" + newProject.id;
}

/* ---------- LOAD CURRENT PROJECT ---------- */
function cur(){
  const id = pid();
  if(!id) return null;
  return getProjects().find(p => p.id === id) || null;
}
function save(p){
  const ps = getProjects();
  const i = ps.findIndex(x => x.id === p.id);
  if(i !== -1){
    ps[i] = p;
    saveProjects(ps);
  }
}

/* ---------- SCORE ACTIONS ---------- */
function run(v){
  const p = cur(); if(!p) return;
  p.runs += v;
  save(p); render();
}
function wicket(){
  const p = cur(); if(!p) return;
  p.wickets += 1;
  save(p); render();
}
function ball(){
  const p = cur(); if(!p) return;
  p.balls += 1;
  save(p); render();
}

/* ---------- UNDO / CORRECTION ---------- */
function undoRun(v){
  const p = cur(); if(!p) return;
  p.runs = Math.max(0, p.runs - v);
  save(p); render();
}
function undoWicket(){
  const p = cur(); if(!p) return;
  p.wickets = Math.max(0, p.wickets - 1);
  save(p); render();
}
function undoBall(){
  const p = cur(); if(!p) return;
  p.balls = Math.max(0, p.balls - 1);
  save(p); render();
}

/* ---------- RENDER ---------- */
function render(){
  const p = cur(); if(!p) return;

  const overs = Math.floor(p.balls / 6) + "." + (p.balls % 6);

  if(document.getElementById("score"))
    score.innerText = `${p.runs}/${p.wickets}`;

  if(document.getElementById("teams"))
    teams.innerText = `${p.teamA} vs ${p.teamB}`;

  if(document.getElementById("overs"))
    oversEl = document.getElementById("overs"),
    oversEl.innerText = overs + " overs";

  // OBS LINK (localhost + GitHub Pages safe)
  const obs = document.getElementById("obsLink");
  if(obs){
    const base = location.origin.includes("127.0.0.1")
      ? "https://thakursandeepu-arch.github.io/Nuristudio"
      : location.origin + location.pathname.replace("/dashboard.html","");

    obs.value = `${base}/overlay.html?id=${p.id}`;
  }
}

/* ---------- COPY OBS LINK ---------- */
function copyOBSLink(){
  const i = document.getElementById("obsLink");
  if(!i) return;
  navigator.clipboard.writeText(i.value);
  alert("OBS Live Link Copied ✔");
}

/* ---------- AUTO UPDATE ---------- */
render();
setInterval(render, 500);
