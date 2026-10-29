// Simplified fixed pose: both arms hang from the shoulders; no independent limbs.
const pilotBody=captainDrawing.querySelector('.captain-person');
pilotBody.querySelectorAll('.pilot-thinking-hand,.pilot-relaxed-hand').forEach(e=>e.remove());
[...pilotBody.children].filter(e=>['M205 408','M243 474','m250 481'].some(prefix=>(e.getAttribute('d')||'').startsWith(prefix))).forEach(e=>e.remove());
pilotBody.insertAdjacentHTML('afterbegin',`<g class="pilot-neutral-arms"><path d="M191 346Q169 349 158 381Q148 428 143 486L169 491Q179 435 189 409L214 373Z" fill="url(#pilot-jacket)"/><path d="M144 483l25 4-3 21q-3 16-14 14-13-1-12-15Z" fill="url(#pilot-face)"/><path d="M144 482l26 3-2 14-26-3Z" fill="#f7faff" stroke="#cbd9e9" stroke-width="1"/><path d="M378 347Q403 355 411 389Q421 439 424 487L398 491Q391 441 378 409L356 373Z" fill="url(#pilot-jacket)"/><path d="M399 484l25-2 3 26q1 15-11 15-12 1-14-14Z" fill="url(#pilot-face)"/><path d="m397 485 28-3 1 14-27 3Z" fill="#f7faff" stroke="#cbd9e9" stroke-width="1"/></g>`);
pilotBody.insertAdjacentHTML('beforeend','<g class="pilot-fixed-epaulette"><path d="m351 351 29 14-11 24-29-14z" fill="#263956"/><path d="m345 370 27 12m-24-20 27 12m-24-20 27 12m-24-20 27 12" stroke="url(#pilot-gold)" stroke-width="4"/></g>');
painScene.querySelector('.captain-story-heading h2').textContent='这些困扰，是否也曾出现在训练中？';
painScene.querySelectorAll('.captain-ai-intro,.captain-solutions,.captain-connect,.captain-ending').forEach(e=>e.remove());
// 中间列与现有章节名一一对应，行序按用户要求：知识问答·图谱 → 数据分析 → 胜任力评估 → 报告生成。
// 末位数字为 featureSvg 图标编号，跟随能力而非行位置。
const goalMappings=[
 ['资料分散、查找费时','知识获取','知识管理 · 智能问答','统一入库，快速检索，回答附来源。','知识可查 · 依据可溯',1],
 ['评语零散、难以对比','评语分析','胜任力评语分析','提炼正负向 OB，沉淀个人能力记录。','能力可比 · 变化可追',3],
 ['汇总耗时、短板难定位','训练报告','飞行训练报告','整合 QAR、EBT 与评语，形成个人报告。','看清短板 · 支撑一人一策',4],
 ['取数繁琐、趋势难掌握','数据查询','智能问数','自然语言提问，直接呈现数据与图表。','随问随得 · 快速掌握趋势',2]
];
goalScene.classList.add('ai-mapping-scene');
goalScene.innerHTML=`<div class="mapping-stage"><div class="kicker">方案总结</div><h2>聚合知识与数据<br><span class="yellow">支撑精准训练</span></h2><div class="mapping-labels"><span>业务痛点</span><span>核心能力</span><span>应用价值</span></div><div class="mapping-rows">${goalMappings.map((m,i)=>`<article class="mapping-row" data-map="${i}"><div class="mapping-pain"><small>0${i+1} / ${m[1]}</small><p>${m[0]}</p></div><div class="mapping-bridge"><i></i><b>→</b></div><div class="mapping-tool"><div>${featureSvg(m[5])}</div><p>${m[2]}</p></div><div class="mapping-bridge"><i></i><b>→</b></div><div class="mapping-solution"><p>${m[3]}</p><small>${m[4]}</small></div></article>`).join('')}</div></div>`;
const goalStoryEffects=window.presentationEffects;
window.presentationEffects=(s,t)=>{
 if(s===painScene){s.dataset.storyMode='questions';s.querySelectorAll('[data-thought]').forEach((e,i)=>e.classList.toggle('on',i===Math.max(0,(window.demoAudioManifest?.slides?.[current]?.painThoughtStarts||[0,Number(s.dataset.duration)/4,Number(s.dataset.duration)/2,Number(s.dataset.duration)*.75]).filter(at=>local>=at).length-1)));return;}
 if(s===goalScene){s.querySelectorAll('.mapping-row').forEach(row=>{row.classList.add('pain-ready','tool-ready','solution-ready')});return;}
 goalStoryEffects?.(s,t);
};
const mappingElements=sceneElements;
// 整块作为一个元素入场：把内部各部分包进 .mapping-stage，避免标题/标签/表格/脚注逐个错峰。
sceneElements=function(s){return s===goalScene?[s.querySelector('.mapping-stage')].filter(Boolean):mappingElements(s)};
painScene.dataset.duration='20';goalScene.dataset.duration='22';
voices[slides.indexOf(painScene)]='训练之后，如何形成优化闭环？数据很多，如何发现价值？经验之外，如何获得数据支撑？每个人不同，训练如何更有针对性？';
voices[slides.indexOf(goalScene)]='将困扰与AI建设目标一一对应：通过智能知识问答辅助专业判断，通过智能数据分析挖掘数据价值，通过胜任力评估分析定位能力短板，通过智能报告生成支撑反馈闭环。';
starts=[];total=0;slides.forEach(s=>{starts.push(total);total+=+s.dataset.duration});
chapterGroups.forEach((g,i)=>{g.start=starts[g.first];g.end=starts[g.last]+ +slides[g.last].dataset.duration;g.duration=g.end-g.start;document.querySelector(`[data-segment="${i}"]`).style.flex=g.duration;document.querySelector(`[data-chapter="${i}"]`).style.flex=g.duration});

[painScene,goalScene].forEach(scene => scene.querySelectorAll('.captain-thought,.mapping-row').forEach((row,index) => row.style.setProperty('--row-delay', `${.15+index*.18}s`)));
