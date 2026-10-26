const college=[
["06:00–06:15","Wake up & reset","Water, wash up, make your bed.","☀️"],
["06:15–07:10","DSA deep work","Solve a problem, explain the approach, record mistakes.","⌘"],
["07:10–08:00","Breakfast & get ready","Eat, pack your bag, leave a commute buffer.","🥣"],
["08:00–16:30","College + commute","Attend classes, take useful notes, use gaps for flashcards.","🎓"],
["16:30–17:15","Snack & decompression","Get home, hydrate, have a snack, take a short break.","☕"],
["17:15–18:15","Gym / fitness","Warm up, train, cool down; use recovery days when scheduled.","🏋️"],
["18:15–19:00","Shower & dinner","Refuel with a balanced meal.","🍲"],
["19:00–20:00","Build a project","Ship one small feature, test, debug, or document progress.","💻"],
["20:00–20:45","College revision","Review today's material and finish urgent assignments.","📚"],
["20:45–21:15","Competitive exam","Practise MCQs, revise a topic, or review current affairs.","🎯"],
["21:15–21:45","Painting / personal time","Creative practice or guilt-free downtime.","🎨"],
["21:45–22:30","Wind down","Plan tomorrow, reduce screens, get ready for sleep.","🌙"]];
const holiday=[
["06:00–06:30","Wake up & morning routine","Water, wash up, light mobility.","☀️"],
["06:30–08:00","DSA deep work","Concepts, timed problems, and an error log.","⌘"],
["08:00–09:00","Breakfast & break","Eat without rushing.","🥣"],
["09:00–11:00","Development sprint","Build and test a project feature.","💻"],
["11:00–11:20","Break","Walk, stretch, hydrate.","🌿"],
["11:20–12:20","College studies","Revise a difficult subject or solve assignments.","📚"],
["12:20–13:30","Lunch & rest","Meal and a short reset.","🍲"],
["13:30–14:30","Competitive exam","Focused syllabus work and timed MCQs.","🎯"],
["14:30–15:30","Painting / hobby","Practice a technique or work on a painting.","🎨"],
["15:30–16:30","Gym","Training or planned active recovery.","🏋️"],
["16:30–18:00","Shower & recovery","Snack, relax, give your body a break.","☕"],
["18:00–19:00","Review & testing","DSA revision, project QA, or task buffer.","🧩"],
["19:00–20:00","Dinner & people time","Be present with family and friends.","🍲"],
["20:00–21:00","Flexible block","Painting, reading, or light catch-up.","✦"],
["21:00–22:30","Wind down","Plan tomorrow, relax, and sleep on time.","🌙"]];
const weekly=[
["MON","Development + college","Ship a feature and revise class notes."],["TUE","Competitive exam + art","Practise questions, then paint for 30 minutes."],["WED","Development + college","Build, test, and review one difficult topic."],["THU","Competitive exam + art","Take a timed quiz and work on a painting."],["FRI","DSA + project review","Timed DSA practice; review what you built."],["SAT","Project milestone + gym","Finish a visible milestone; train if scheduled."],["SUN","Review + recovery","Plan the week, revise lightly, paint, recover."]];
const tasks=["DSA: solve problems and review mistakes","Development: complete one focused project task","College: revise today's topics","Competitive exam: practise questions","Fitness: workout or planned recovery","Meals, hydration and a proper break","Painting, hobby or intentional downtime","Plan tomorrow and protect sleep"];
const $=s=>document.querySelector(s);let view="college";const key="lifeos-v1";const dateKey=new Date().toLocaleDateString("en-CA");
function read(){try{return JSON.parse(localStorage.getItem(key)||"{}")}catch(e){return {}}}function write(d){localStorage.setItem(key,JSON.stringify(d))}function state(){return read()}
function renderSchedule(){const host=$("#scheduleList");if(view==="week"){$("#scheduleTitle").textContent="One theme per day";$(".pill").textContent="WEEKLY ROTATION";host.innerHTML=weekly.map(d=>'<article class="time-card"><div class="time">'+d[0]+'</div><div><h3>'+d[1]+'</h3><p>'+d[2]+'</p></div><span class="emoji">✦</span></article>').join("")}else{const data=view==="holiday"?holiday:college;$("#scheduleTitle").textContent=view==="holiday"?"Holiday flow":"College day flow";$(".pill").textContent="06:00 AM — 10:30 PM";host.innerHTML=data.map(d=>'<article class="time-card"><div class="time">'+d[0]+'</div><div><h3>'+d[1]+'</h3><p>'+d[2]+'</p></div><span class="emoji">'+d[3]+'</span></article>').join("")}}
function renderChecklist(){const s=state(),checked=s.checkDate===dateKey?s.checked||[]:[];$("#checklist").innerHTML=tasks.map((t,i)=>'<label class="check-row '+(checked.includes(i)?"done":"")+'"><input type="checkbox" data-i="'+i+'" '+(checked.includes(i)?"checked":"")+'><span>'+t+'</span></label>').join("");$("#checklist").querySelectorAll("input").forEach(input=>input.addEventListener("change",()=>{const fresh=state(),arr=fresh.checkDate===dateKey?fresh.checked||[]:[],n=Number(input.dataset.i),next=input.checked?Array.from(new Set(arr.concat([n]))):arr.filter(x=>x!==n);write(Object.assign({},fresh,{checkDate:dateKey,checked:next}));renderChecklist();renderProgress()}))}
function renderProgress(){const s=state(),checked=s.checkDate===dateKey?s.checked||[]:[],pct=Math.round(checked.length/tasks.length*100);$("#progressPct").textContent=pct+"%";$("#progressCount").textContent=checked.length+"/"+tasks.length;$("#progressRing").style.setProperty("--progress",pct+"%")}
function renderNotes(){$("#notes").value=state().notes||""}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{view=b.dataset.view;document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===b));renderSchedule()}));
$("#resetBtn").addEventListener("click",()=>{if(confirm("Reset today's checklist?")){const s=state();write(Object.assign({},s,{checkDate:dateKey,checked:[]}));renderChecklist();renderProgress()}});
$("#saveNotes").addEventListener("click",()=>{const s=state();write(Object.assign({},s,{notes:$("#notes").value}));$("#saveStatus").textContent="Saved on this device";setTimeout(()=>$("#saveStatus").textContent="",1800)});
$("#themeBtn").addEventListener("click",()=>{document.body.classList.toggle("light");const s=state();write(Object.assign({},s,{light:document.body.classList.contains("light")}))});
$("#todayLabel").textContent=new Date().toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"});if(state().light)document.body.classList.add("light");renderSchedule();renderChecklist();renderProgress();renderNotes();
