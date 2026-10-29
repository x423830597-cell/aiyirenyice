// Interactive HTML prototype built from the supplied QA reference screens.
(() => {
 const scene=slides.find(s=>s.classList.contains('qa-scene'));
 const panel=scene?.querySelector('#qaApp'),frame=panel?.querySelector('iframe');if(!frame)return;
 let manual=false,active=false;
 frame.removeAttribute('src');frame.srcdoc=window.qaPrototypeHtml;
 frame.addEventListener('load',()=>{
 const d=frame.contentDocument;if(!d)return;if(active)frame.contentWindow.qaReference?.demoAt(local);
 d.addEventListener('input',e=>{if(e.isTrusted)manual=true;});
 d.addEventListener('click',e=>{if(!e.isTrusted)return;manual=true;if(playing){toggle();updateVideo();}});
 });
 window.addEventListener('message',e=>{if(e.source!==frame.contentWindow||e.data?.type!=='qa-navigate')return;
 const patterns={'智能问数':/智能问数|数据小参谋/,'飞行训练报告':/报告/,'胜任力评语分析':/胜任力|评语/,'知识管理':/知识库/,'知识小管家':/知识库/};
 const pattern=patterns[e.data.module];if(!pattern)return;const index=slides.findIndex(s=>s!==scene&&pattern.test((s.dataset.title||'')+(s.dataset.chapter||'')));if(index>=0)show(index);
 });
 const previous=window.presentationEffects;
 window.presentationEffects=(s,t)=>{
 previous?.(s,t);if(s!==scene){if(active)frame.contentWindow.qaReference?.reset();active=false;return;}
 if(!active){active=true;manual=false;frame.contentWindow.qaReference?.reset();}if(!manual&&(playing||window.timelineScrubbing))frame.contentWindow.qaReference?.demoAt((()=>{const item=window.demoAudioManifest?.slides?.[current],g=item?.captionGroups||[],input=g[1]?.start??3,search=g[2]?.start??7,cite=g[3]?.start??12,end=item?.audioDuration??20,answer=Math.max(search+.8,cite-1.5);const now=[0,input,search,answer,cite,Math.min(cite+1.1,end-.8),end,end+.4],before=[0,3,5,15,22,24,27,28];let i=0;while(i<now.length-2&&t>=now[i+1])i++;return before[i]+(t-now[i])/(now[i+1]-now[i])*(before[i+1]-before[i]);})());
 const graphEntry=scene.querySelector('.qa-combined-graph-entry');if(graphEntry)graphEntry.style.display=t>=(window.demoAudioManifest?.slides?.[current]?.captionGroups?.[3]?.start??12)?'':'none';scene.classList.toggle('qa-graph-ready',t>=8.5);scene.classList.toggle('intro-dismissed',local>=3);panel.classList.remove('focus-prototype');

 };
})();
