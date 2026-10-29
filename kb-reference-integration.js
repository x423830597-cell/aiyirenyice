// Reference-based knowledge library, documents, and chunks. One primary navigation entry.
(() => {
 const scenes=slides.filter(s=>s.querySelector('.kb-mount'));
 const mounted=new Map();
 const style=document.createElement('style');style.textContent='.kb-reference-scene .kb-showcase-intro{display:none!important}.slide.kb-reference-scene .kb-mount{left:20px!important;top:20px!important;width:1560px!important;height:812px!important;border-radius:15px;background:white;box-shadow:none}.kb-module-summary{position:absolute;top:23px;left:35px;color:#fff}.kb-module-summary strong{display:block;font-size:24px;font-weight:600}.kb-module-summary p{font-size:18px;color:#ffffffcc;line-height:1.5;margin-top:8px}.kb-simple-steps{position:absolute;right:35px;top:40px;display:flex;gap:12px}.kb-simple-steps span{font-size:14px;color:#ffffff99;border:1px solid #ffffff30;border-radius:20px;padding:7px 14px}.kb-simple-steps span.active{color:#ffc402;border-color:#ffc40299;background:#ffffff0c}.kb-reference-frame{width:100%;height:100%;border:0;display:block}';document.head.append(style);
 scenes.forEach((scene,index)=>{
 scene.classList.add('kb-reference-scene');const summary=document.createElement('div');summary.className='kb-module-summary';summary.innerHTML='<strong>知识小管家</strong><p>解决机长手册经验分散、资料难以统一管理和复用的问题。</p>';scene.append(summary);if(index>0){const steps=document.createElement('div');steps.className='kb-simple-steps';steps.innerHTML='<span>1 统一入库</span><span>2 核对切片</span><span>3 验证检索</span>';scene.append(steps);}scene.dataset.duration=index===0?'15.2':'35';scene.dataset.title=index===0?'知识小管家：创建并进入知识库':'知识小管家：上传资料、核对切片、验证检索';
 const root=scene.querySelector('.kb-mount');root.innerHTML='';const frame=document.createElement('iframe');frame.className='kb-reference-frame';frame.title='知识小管家 · 知识库与切片管理';root.append(frame);frame.srcdoc=window.kbPrototypeHtml;
 const entry={frame,index,manual:false,active:false,step:0};mounted.set(scene,entry);
 frame.addEventListener('load',()=>{if(index>0)frame.contentWindow.kbReference?.showFiles();const d=frame.contentDocument;d.addEventListener('click',e=>{if(!e.isTrusted)return;entry.manual=true;if(playing){toggle();updateVideo();}});d.addEventListener('input',e=>{if(e.isTrusted)entry.manual=true;});});
 const voice=index===0?'从知识小管家直接进入知识库。打开777机队知识库，查看资料名称、文件大小、解析状态与创建时间。':'在知识库中上传文件，确认后开始解析。打开文档详情，预览原文及切片，核对内容分段规则。召回测试，输入测试问题，展示系统返回的召回切片列表，及其与问题的相关性。';const pos=slides.indexOf(scene);if(pos>=0)voices[pos]=voice;
 });
 const previous=window.presentationEffects;
 window.presentationEffects=(scene,t)=>{previous?.(scene,t);mounted.forEach((entry,s)=>{
 const api=entry.frame.contentWindow?.kbReference;
 if(s!==scene){if(entry.active)api?.resetPlayback();entry.active=false;return;}
 if(!api)return;
 if(!entry.active||t<(entry.lastTime??-1)){entry.active=true;entry.manual=false;api.resetPlayback();}
 entry.lastTime=t;
 if(entry.manual)return;
 // A seek, pause or resumed play all render the same screen for the same timestamp.
 const audio=window.demoAudioManifest?.slides?.[current];api.playbackAt(entry.index===0?t:t*(25/(audio?.duration??17.84)),entry.index===0,(audio?.audioDuration??10.9)+.1);
 });};
 window.addEventListener('message',e=>{if(e.data?.type!=='qa-navigate'||![...mounted.values()].some(x=>x.frame.contentWindow===e.source))return;const patterns={'智能问答':/智能知识问答/,'智能问数':/AI智能数据分析|数据小参谋/,'飞行训练报告':/智能报告生成/,'胜任力评语分析':/分析小助手|胜任力/};const pattern=patterns[e.data.module];if(!pattern)return;const i=slides.findIndex(s=>pattern.test((s.dataset.chapter||'')+(s.dataset.title||'')));if(i>=0)show(i);});
})();
