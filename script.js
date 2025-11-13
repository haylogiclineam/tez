const THEMES = [
  { id:1, title:'Թեմա 1. Ընդհանուր հասկացություններ', video:'videos/topic1.mp4', content:'Էլեկտրոնային ուսուցումը ընդգրկում է օնլայն և հեռավար մեթոդներ։', bgImg: "tema1" },
  { id:2, title:'Թեմա 2. Դասընթացների պահանջներ', video:'videos/topic2.mp4', content:'Դիդակտիկ, տեխնիկական և դիզայնի սկզբունքներ։', bgImg: "tema2" },
  { id:3, title:'Թեմա 3. Նախագծման փուլեր', video:'videos/topic3.mp4', content:'Վերլուծություն, պլանավորում, ստեղծում, թեստավորում։', bgImg: "tema3" },
  { id:4, title:'Թեմա 4. LMS հարթակներ', video:'videos/topic4.mp4', content:'Moodle, Google Classroom, Blackboard։', bgImg: "tema4" },
  { id:5, title:'Թեմա 5. Դասընթացների ծրագրեր', video:'videos/topic5.mp4', content:'Storyline, Captivate, iSpring Suite։', bgImg: "tema5" },
  { id:6, title:'Թեմա 6. Տեսանյութեր և անիմացիա', video:'videos/topic6.mp4', content:'Սցենար, մոնտաժ, ենթագրեր։', bgImg: "tema6" },
  { id:7, title:'Թեմա 7. Թեստեր', video:'videos/topic7.mp4', content:'iSpring, Google Forms, Hot Potatoes։', bgImg: "tema2" },
];

const QUIZ_Q = [
  { q:'LMS նշանակում է...', opts:['Դասընթացների կառավարման համակարգ','Լեզվի մոդելային սերվեր','Լիցքավորման մեխանիզմ'], a:0 },
  { q:'iSpring Suite-ը նախատեսված է...', opts:['Թեստերի պատրաստման','Տեքստերի խմբագրման','Ֆիլմերի'], a:0 },
  { q:'Moodle-ը օգտագործվում է...', opts:['Էլեկտրոնային ուսուցման','Գրքերի հրատարակման','Ծրագրավորման'], a:0 },
  { q:'Articulate Storyline-ը...', opts:['Դասընթացների ստեղծման գործիք է','Տվյալների բազա','Համակարգային մոդուլ'], a:0 },
  { q:'Hot Potatoes ծրագիրը...', opts:['Թեստերի պատրաստման համար է','Գրաֆիկայի','Տեքստերի'], a:0 },
  { q:'Google Classroom-ը...', opts:['Ուսումնական հարթակ է','Դիզայնի գործիք','Տվյալների պահեստ'], a:0 },
  { q:'Տեսանյութերի դերը...', opts:['Ուսուցման գրավչության բարձրացում','Անիմացիաների նվազեցում','Աուդիո նյութերի հեռացում'], a:0 },
  { q:'Էլեկտրոնային ուսուցումը...', opts:['Օնլայն և հեռավար մեթոդների համադրություն է','Միայն ֆիզիկական դասեր','Միայն բջջային հավելված'], a:0 },
  { q:'Դիդակտիկ պահանջները վերաբերում են...', opts:['Ուսուցման նպատակներին','Տեխնիկական սարքավորումներին','Մուլտիմեդիա ֆայլերին'], a:0 },
  { q:'Adobe Captivate-ը նախատեսված է...', opts:['Էլեկտրոնային դասընթացների պատրաստման','Տեսախաղերի','Գրաֆիկական'], a:0 },
];

const topicsList = document.getElementById('topicsList');
const topicDetail = document.getElementById('topicDetail');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const quizArea = document.getElementById('quizArea');

// Render topics
THEMES.forEach(t=>{
  const card=document.createElement('article');
  const cardImg=document.createElement('div');
  card.className='card';
  cardImg.className='card-img';
  cardImg.style.backgroundImage = `url(images/${t.bgImg}.jpg)`
  card.innerHTML=`<h3>${t.title}</h3><p>${t.content}</p>
    <div class="actions">
      <button class="btn openTopic" data-id="${t.id}">Դիտել</button>
      <button class="btn secondary markDone" data-id="${t.id}">Նշել կարդացած</button>
    </div>`;
  card.appendChild(cardImg);
  topicsList.appendChild(card);
});

document.body.addEventListener('click', e=>{
  if(e.target.matches('.openTopic')) openTopic(+e.target.dataset.id);
  if(e.target.matches('.markDone')) markDone(+e.target.dataset.id);
});

const DONE_KEY='el_done_topics_v2';
function getDone(){return JSON.parse(localStorage.getItem(DONE_KEY)||'[]');}
function setDone(arr){localStorage.setItem(DONE_KEY,JSON.stringify(arr));updateProgress();}
function markDone(id){
  let done=getDone();
  if(!done.includes(id)){
    done.push(id);
    setDone(done);
    toast('Նշվեց որպես կարդացած');
  }
}

function updateProgress(){
  const done=getDone();
  const pct=Math.round((done.length/THEMES.length)*100);
  progressBar.style.width=pct+'%';
  progressPercent.textContent=pct+'%';
}

// ---- Open topic ----
function openTopic(id){
  const t=THEMES.find(x=>x.id===id);
  topicDetail.style.display='block';
  topicDetail.innerHTML=`
    <h3>${t.title}</h3>
    <p>${t.content}</p>
    <video controls src="${t.video}" preload="metadata" style="width:100%;max-height:360px;border-radius:12px;margin-top:10px;"></video>
    <div style="margin-top:12px">
      <button class="btn markNow" data-id="${t.id}">Նշել կարդացած</button>
      <button class="btn secondary" id="openQuizFromTopic">Գնալ թեստին</button>
    </div>`;
  
  // actions
  topicDetail.querySelector('.markNow').addEventListener('click',e=>markDone(+e.target.dataset.id));
  topicDetail.querySelector('#openQuizFromTopic').addEventListener('click',openQuiz);
  
  // scroll to detail smoothly
  topicDetail.scrollIntoView({behavior:'smooth'});
}

document.getElementById('startBtn').addEventListener('click',()=>document.getElementById('topics').scrollIntoView({behavior:'smooth'}));
document.getElementById('openAll').addEventListener('click',()=>THEMES.forEach(t=>openTopic(t.id)));

updateProgress();

// ---- Quiz ----
document.getElementById('openQuiz').addEventListener('click',openQuiz);

function openQuiz(){
  quizArea.innerHTML='';
  quizArea.classList.add('visible');

  const closeBtn=document.createElement('button');
  closeBtn.textContent='✖';
  closeBtn.className='closeQuiz';
  closeBtn.style='position:absolute;top:5px;right:8px;border:none;background:transparent;font-size:18px;cursor:pointer;';
  closeBtn.onclick=()=>{quizArea.classList.remove('visible');quizArea.innerHTML='';};
  quizArea.appendChild(closeBtn);

  const form=document.createElement('form');
  QUIZ_Q.forEach((item,i)=>{
    const qdiv=document.createElement('div');
    qdiv.className='question';
    qdiv.innerHTML=`<strong>${i+1}. ${item.q}</strong>`;
    item.opts.forEach((opt,j)=>{
      qdiv.innerHTML+=`<div><label><input type="radio" name="q${i}" value="${j}"> ${opt}</label></div>`;
    });
    form.appendChild(qdiv);
  });

  const btn=document.createElement('button');
  btn.textContent='Ավարտել թեստը';
  btn.className='btn';
  btn.type='button';
  btn.onclick=()=>gradeQuiz(form);
  form.appendChild(btn);
  quizArea.appendChild(form);

  quizArea.scrollIntoView({behavior:'smooth'});
}

function gradeQuiz(form){
  let score=0;
  QUIZ_Q.forEach((q,i)=>{
    const selected=form[`q${i}`];
    const checked=[...selected].find(x=>x.checked);
    if(checked && +checked.value===q.a) score++;
  });
  const pct=Math.round((score/QUIZ_Q.length)*100);
  alert(`Ճիշտ պատասխաններ՝ ${score}/${QUIZ_Q.length} (${pct}%)`);
}

function toast(msg){
  const t=document.createElement('div');
  t.textContent=msg;
  t.style='position:fixed;bottom:20px;right:20px;background:#2b8f6b;color:#fff;padding:8px 12px;border-radius:8px;';
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),2000);
}
