let data = JSON.parse(localStorage.getItem("nuriScore")) || {
  teamA:"", teamB:"", runs:0, wickets:0
};

function createProject(){
  data.teamA = document.getElementById("teamA").value;
  data.teamB = document.getElementById("teamB").value;
  data.runs = 0;
  data.wickets = 0;
  localStorage.setItem("nuriScore", JSON.stringify(data));
  window.location = "dashboard.html";
}

function run(r){
  data.runs += r;
  save();
}

function wicket(){
  data.wickets += 1;
  save();
}

function save(){
  localStorage.setItem("nuriScore", JSON.stringify(data));
  render();
}

function render(){
  if(document.getElementById("score"))
    document.getElementById("score").innerText =
      `${data.runs}/${data.wickets}`;

  if(document.getElementById("liveScore"))
    document.getElementById("liveScore").innerText =
      `${data.runs}/${data.wickets}`;

  if(document.getElementById("teams"))
    document.getElementById("teams").innerText =
      `${data.teamA} vs ${data.teamB}`;
}

render();
setInterval(render,500);
