const defaultState = {
  name:"Viajante",
  hp:100,
  maxHp:100,
  will:0,
  stats:{
    reason:0,
    courage:0,
    empathy:0,
    autonomy:0,
    will:0
  },
  inventory:[],
  journal:[],
  scene:"start",
  visited:[],
  started:false,
  ending:false
};

const $ = id => document.getElementById(id);

const clone = obj => JSON.parse(JSON.stringify(obj));

let state = loadState();  

function loadState(){
  try{
    const saved = localStorage.getItem("eco_rpg_save");
    return saved ? {...clone(defaultState), ...JSON.parse(saved)} : clone(defaultState);
  }catch(e){ return clone(defaultState); }
}
function saveState(show=true){
  localStorage.setItem("eco_rpg_save", JSON.stringify(state));
  if(show) toast("Jogo salvo.");
}
function reset(){
  state=clone(defaultState);
  const name=prompt("Como seu personagem será chamado?", "Kael");
  if(name && name.trim()) state.name=name.trim().slice(0,18);
  state.started=true;
  saveState(false);
  showGame();
  render();
}
function showGame(){ $("menu").classList.remove("active"); $("game").classList.add("active"); }
function showMenu(){ $("game").classList.remove("active"); $("menu").classList.add("active"); }
function render(){
  const s=STORY[state.scene] || STORY.start;
  $("playerName").textContent=state.name;
  $("avatar").textContent=state.name[0].toUpperCase();
  $("chapterLabel").textContent=s.chapter;
  $("locationLabel").textContent=s.location;
  $("sceneTitle").textContent=s.title;
  $("sceneSymbol").textContent=s.symbol || "◈";
  $("storyText").innerHTML=s.text.map(x=>`<p>${format(x)}</p>`).join("");
  renderStats();
  renderChoices(s);
  updateBars();
  if(state.scene==="final") showFinal();
}
function format(t){ return t.replace(/“([^”]+)”/g,"<em>“$1”</em>"); }
function renderStats(){
  const labels={reason:"Razão",courage:"Coragem",empathy:"Empatia",autonomy:"Autonomia",will:"Vontade"};
  $("stats").innerHTML=Object.entries(state.stats).map(([k,v])=>`<div class="stat"><span>${labels[k]}</span><b>${Math.max(0,v)}</b></div>`).join("");
  const vals=state.stats, max=Math.max(vals.reason,vals.courage,vals.empathy,vals.autonomy,vals.will);
  let ph="Sem convicção definida";
  if(max>=4){
    const key=Object.entries(vals).sort((a,b)=>b[1]-a[1])[0][0];
    ph={reason:"Buscador da Verdade",courage:"O Destemido",empathy:"O Humanista",autonomy:"O Livre",will:"O Inabalável"}[key];
  }
  $("philosophyLabel").textContent=ph;
}
function renderChoices(s){
  const c=$("choices"); c.innerHTML="";
  s.choices.forEach((ch,i)=>{
    const b=document.createElement("button"); b.className="choice";
    const effects=Object.entries(ch.effect||{}).filter(([k,v])=>v);
    const note=effects.map(([k,v])=>`${label(k)} ${v>0?"+":""}${v}`).join(" • ");
    b.innerHTML=`<span class="num">${i+1}.</span>${ch.label}${note?`<small>${note}</small>`:""}`;
    b.onclick=()=>choose(ch);
    c.appendChild(b);
  });
  if(!s.choices.length){
    const b=document.createElement("button"); b.className="choice primary"; b.textContent="Voltar ao menu";
    b.onclick=showMenu;c.appendChild(b);
  }
}
function label(k){return {reason:"Razão",courage:"Coragem",empathy:"Empatia",autonomy:"Autonomia",will:"Vontade"}[k]||k}
function choose(ch){
  Object.entries(ch.effect||{}).forEach(([k,v])=>{
    if(state.stats[k]!==undefined) state.stats[k]=Math.max(0,state.stats[k]+v);
    if(k==="will") state.will=Math.max(0,state.will+v);
  });
  if(ch.item && !state.inventory.includes(ch.item)) state.inventory.push(ch.item);
  state.journal.push({scene:STORY[state.scene].title,choice:ch.label});
  state.visited.push(state.scene);
  state.scene=ch.next;
  saveState(false); render();
}
function updateBars(){
  $("hpText").textContent=`${state.hp} / ${state.maxHp}`;
  $("hpBar").style.width=`${Math.max(0,state.hp/state.maxHp*100)}%`;
  $("willText").textContent=state.will;
  $("willBar").style.width=`${Math.min(100,state.will/10*100)}%`;
}
function showFinal(){
  setTimeout(()=>{
    const v=state.stats;
    let title="O Caminho do Eu", desc="Você não pertence a uma única filosofia. Suas escolhas formaram uma combinação própria.";
    if(v.autonomy>=6 && v.will>=5) {title="O Livre";desc="Você escolheu assumir a autoria da própria vida. Liberdade, para você, não significou ausência de limites — significou responsabilidade."}
    else if(v.reason>=6){title="O Buscador da Verdade";desc="Você preferiu perguntas difíceis a respostas confortáveis. Para você, compreender é uma forma de liberdade."}
    else if(v.empathy>=5){title="O Humanista";desc="Você descobriu que uma filosofia que ignora pessoas pode se tornar apenas uma teoria."}
    else if(v.will>=6){title="O Inabalável";desc="Você aprendeu a separar aquilo que pode controlar daquilo que precisa aceitar."}
    else {title="O Caminhante";desc="Você não encontrou uma doutrina para seguir. Encontrou contradições — e decidiu continuar caminhando."}
    $("storyText").innerHTML+=`<div class="final"><div class="seal">✦</div><h2>${title}</h2><p>${desc}</p><p><strong>Razão ${v.reason} • Coragem ${v.courage} • Empatia ${v.empathy} • Autonomia ${v.autonomy} • Vontade ${v.will}</strong></p></div>`;
    $("choices").innerHTML="";
    const b=document.createElement("button");b.className="choice primary";b.textContent="Recomeçar e escolher diferente";b.onclick=reset;$("choices").appendChild(b);
  },100);
}
function openModal(html){
  $("modalContent").innerHTML=html;$("overlay").classList.remove("hidden");
}
function inventory(){
  const items=state.inventory.length?state.inventory.map(x=>`<div class="inventory-item">◈ <b>${x}</b><br><small>Um objeto ligado à sua jornada.</small></div>`).join(""):"<p>Seu inventário está vazio.</p>";
  openModal(`<h2>Inventário</h2>${items}`);
}
function journal(){
  const entries=state.journal.length?state.journal.map((x,i)=>`<div class="journal-entry"><small>ESCOLHA ${i+1} • ${x.scene}</small><p>${x.choice}</p></div>`).join(""):"<p>Você ainda não tomou nenhuma decisão.</p>";
  openModal(`<h2>Diário</h2><p style="color:#999">Suas escolhas ficam registradas aqui.</p>${entries}`);
}
function credits(){openModal(`<h2>ECO — O Caminho do Eu</h2><p>Um RPG narrativo sobre filosofia, escolhas e identidade.</p><p>Conceito e protótipo: projeto pessoal.</p><p style="color:#999">Inspirado em problemas filosóficos clássicos. As referências são usadas como elementos narrativos, não como respostas definitivas.</p>`)}
function toast(msg){
  const t=document.createElement("div");t.textContent=msg;
  Object.assign(t.style,{position:"fixed",bottom:"25px",left:"50%",transform:"translateX(-50%)",background:"#c7a96b",color:"#111",padding:"10px 18px",borderRadius:"5px",zIndex:20,fontWeight:"700"});
  document.body.appendChild(t);setTimeout(()=>t.remove(),1600);
}

$("newGameBtn").onclick=reset;
$("continueBtn").onclick=()=>{
  if(!state.started){toast("Nenhum jogo salvo.");return}
  showGame();render();
};
$("creditsBtn").onclick=credits;
$("menuBtn").onclick=showMenu;
$("saveBtn").onclick=()=>saveState(true);
$("inventoryBtn").onclick=inventory;
$("journalBtn").onclick=journal;
$("closeModal").onclick=()=>$("overlay").classList.add("hidden");
$("overlay").onclick=e=>{if(e.target===$("overlay"))$("overlay").classList.add("hidden")};

document.addEventListener("keydown",e=>{
  if($("game").classList.contains("active")){
    const s=STORY[state.scene];
    const n=Number(e.key)-1;
    if(s && s.choices[n]) choose(s.choices[n]);
  }
});
