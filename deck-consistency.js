// One final pass owns presentation ordering, descriptions and the global timeline.
(() => {
 const focused=slides[current],voiceByScene=new Map(slides.map((s,i)=>[s,voices[i]]));
 const rank={'平台介绍':0,'知识库系统搭建':1,'智能知识问答':2,'分析小专员':3,'智能报告生成':4,'AI智能数据分析':5,'成效':6,'总结展望':7};
 const groupMembers=chapterGroups.map(g=>({group:g,members:slides.slice(g.first,g.last+1)}));
 slides.filter(s=>s.dataset.chapter==='成效').forEach(s=>s.remove());
 const sceneRank=s=>s===goalScene?6.5:(rank[s.dataset.chapter]??99);
 const ordered=slides.filter(s=>s.dataset.chapter!=='成效').sort((a,b)=>sceneRank(a)-sceneRank(b));ordered.forEach(s=>document.getElementById('deck').append(s));slides.splice(0,slides.length,...ordered);voices.splice(0,voices.length,...slides.map(s=>voiceByScene.get(s)||s.dataset.title));
 const descriptions={
 '知识库系统搭建':{title:'知识入库，可管可查',voice:'知识小管家，知识入库，可管可查。进入知识库管理，创建机组专属知识库，设置可见范围和管理部门。创建完成后，进入该知识库，查看文档列表。'},
 '智能知识问答':{duration:28,title:'专业知识，一问即得',voice:'问答小助手支持对话交流与知识库问答。输入明天坐车去深圳执行航班的相关要求，系统检索资料，返回乘车、准备、报到和证件要求。点击引用，核对《驻外过夜指引》中的资料依据。'},
 '分析小专员':{duration:30,title:'教员评语，结构化沉淀',voice:'分析小专员，教员评语，结构化沉淀。输入原始评语，点击分析，系统输出统一格式的正向表现与负向表现，关联对应OB项。结果可编辑和复制。进入学员评语查询，查看最近两次训练评语与分析结果，点击OB详情，纵向对比学员能力变化。'},
 '智能报告生成':{duration:34,title:'一人一策，全面展现',voice:'报告小顾问，一人一策，全面展现。支持近三十七个月、十三个月、三个月和一个月四种报告周期，汇总核心胜任力与QAR数据，生成总体评价。核心胜任力展示单维度评分、OB详细数据和原始评语。QAR展示九项指标的个人均值、群体均值与偏离度，点击指标可查看近十三个月的趋势与散点。'},
 'AI智能数据分析':{duration:26,title:'训练指标，一问即得',voice:'数据小参谋，训练指标，一问即得。数据源涵盖QAR与EBT数据，管理者直接以自然语言提问，无需手动选择数据库或编写查询语句。例如，列出二零二五年七七七机型组胜任力得分为两分的用户，系统理解意图，匹配数据源，返回查询结果，支持表格和图表查看。'}
 };
 const occurrences={};slides.forEach((s,i)=>{const key=s.dataset.chapter,def=descriptions[key];if(!def)return;const n=occurrences[key]||0;occurrences[key]=n+1;if(def.duration)s.dataset.duration=String(def.duration);if(n===0){voices[i]=def.voice;s.dataset.title=(key==='智能知识问答'?'问答小助手':key==='分析小专员'?'分析小专员':key==='智能报告生成'?'报告小顾问':key==='AI智能数据分析'?'数据小参谋':'知识小管家')+'：'+def.title;}const script=window.alignedScript?.find(c=>c[0]===key);if(script){script[2]=def.title;script[3]=def.voice;}});
 const kb=slides.find(s=>s.dataset.chapter==='知识库系统搭建');if(kb?.querySelector('.kb-showcase-intro h2'))kb.querySelector('.kb-showcase-intro h2').innerHTML='知识入库<br>可管可查';
 const qa=slides.find(s=>s.classList.contains('qa-scene'));if(qa){const copy=qa.querySelector('.qa-unified-copy');if(copy)copy.textContent='面向飞行员的统一知识问答入口，覆盖机型手册、训练大纲、运行规范与一线经验。支持多轮追问，回答附带来源依据。';}
 const analysis=slides.find(s=>s.classList.contains('analysis-coach-scene'));if(analysis){const h=analysis.querySelector('.coach-intro h2'),p=analysis.querySelector('.coach-intro p');if(h)h.innerHTML='教员评语<br><span>结构化沉淀</span>';if(p)p.textContent='辅助整理训练评语，提炼正向表现与待提升项，形成统一的能力记录。';}
 const report=slides.find(s=>s.classList.contains('training-report-demo'));if(report){const h=report.querySelector('.training-report-intro h2'),p=report.querySelector('.training-report-intro p');if(h)h.innerHTML='一人一策<br><span class="yellow">全面展现</span>';if(p)p.textContent='汇总核心胜任力评价与飞行数据，形成个人训练报告。';}
 const data=slides.find(s=>s.classList.contains('data-query-scene'));if(data){data.querySelector('.data-query-intro h2').innerHTML='训练指标<br><span class="yellow">一问即得</span>';data.querySelector('.data-query-intro p').textContent='以自然语言查询 QAR 与 EBT 数据，自动匹配指标口径并呈现结果。';}
 // Overview names use the same five-module sequence.
 const overviewScene=slides.find(s=>s.dataset.original==='1');if(overviewScene?.querySelector('.capabilities')){
 overviewScene.querySelector('h2').innerHTML='一个工作台<br>连接<span class="yellow">知识与数据</span>';
 overviewScene.querySelector('.lead').textContent='知识智能化 · 数据可视化 · 业务协同化';
 const modules=[['知识小管家','知识沉淀，手册经验统一入库',1],['问答小助手','自然语言提问，依据可追溯',0],['分析小专员','辅助评语分析，结构化沉淀数据',3],['报告小顾问','汇总分析，形成训练报告',4],['数据小参谋','直接问数，自动生成图表',2]];
 overviewScene.querySelector('.capabilities').innerHTML=modules.map(([name,desc,icon],i)=>'<span data-number="'+String(i+1).padStart(2,'0')+'" style="--card-index:'+i+'"><i class="feature-icon">'+featureSvg(icon)+'</i><strong class="capability-name">'+name+'</strong><small>'+desc+'</small></span>').join('');
 const style=document.createElement('style');style.textContent=`
.slide[data-original="1"] .capabilities>span{box-sizing:border-box;min-height:260px;padding:30px 25px;display:grid;grid-template-rows:80px auto 1fr;align-content:start;justify-content:stretch;row-gap:16px;animation:none;transform:none}
.slide[data-original="1"] .capabilities>span:before{top:24px;right:25px;left:auto}
.slide[data-original="1"] .capabilities>span .feature-icon{position:static;align-self:start;display:grid;place-items:center;width:49px;height:49px;padding:0;margin:0}
.slide[data-original="1"] .capabilities>span .capability-name{display:block;position:static;font-size:29px;font-weight:600;line-height:1.35;margin:0;white-space:nowrap}
.slide[data-original="1"] .capabilities>span small{display:block;font-size:16px;line-height:1.7;min-height:0;margin:0;align-self:start}
`;document.head.append(style);
 }
 starts.splice(0,starts.length);total=0;slides.forEach(s=>{starts.push(total);total+=Number(s.dataset.duration);});
 const groups=groupMembers.map(({group,members})=>{const indices=members.map(s=>slides.indexOf(s)).filter(i=>i>=0);return {...group,first:Math.min(...indices),last:Math.max(...indices)};}).filter(g=>Number.isFinite(g.first)).sort((a,b)=>a.first-b.first);groups.forEach(g=>{g.start=starts[g.first];g.end=starts[g.last]+Number(slides[g.last].dataset.duration);g.duration=g.end-g.start;});chapterGroups.splice(0,chapterGroups.length,...groups);
 const track=document.querySelector('.chapter-track'),labels=document.querySelector('.chapter-labels');track.innerHTML=groups.map((g,i)=>'<button type="button" class="chapter-segment" data-segment="'+i+'" style="flex:'+g.duration+'" aria-label="'+g.name+'播放进度"><i></i></button>').join('');labels.innerHTML=groups.map((g,i)=>'<button data-chapter="'+i+'" style="flex:'+g.duration+'">'+g.name+'</button>').join('');labels.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>seek(chapterGroups[i].start));track.querySelectorAll('button').forEach((b,i)=>b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();seek(chapterGroups[i].start);}if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();e.stopPropagation();seek(starts[current]+local+(e.key==='ArrowRight'?2:-2));}});
 const overview=document.getElementById('gridContent');overview.innerHTML=slides.map((s,i)=>'<button data-slide="'+i+'"><small>'+String(i+1).padStart(2,'0')+' / '+s.dataset.chapter+' · '+Number(s.dataset.duration).toFixed(1)+'秒</small><b>'+s.dataset.title+'</b></button>').join('');overview.querySelectorAll('[data-slide]').forEach(b=>b.onclick=()=>{show(+b.dataset.slide);document.getElementById('overview').classList.remove('open');});slides.forEach((s,i)=>{const footer=s.querySelector('.footer span:last-child');if(footer)footer.textContent=String(i+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');});current=Math.max(0,slides.indexOf(focused));document.getElementById('count').textContent=(current+1)+' / '+slides.length;updateVideo();
})();
