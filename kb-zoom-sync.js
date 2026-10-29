// A single timeline-derived zoom owns both the introduction and the prototype geometry.
(() => {
 const scene=document.querySelector('.naming-library-intro');if(!scene)return;
 const mount=scene.querySelector('.kb-mount'),frame=mount?.querySelector('iframe'),intro=scene.querySelector('.kb-showcase-intro');if(!mount||!frame||!intro)return;
 const set=(node,key,value)=>node.style.setProperty(key,value,'important');
 const mix=(a,b,p)=>(a+(b-a)*p)+'px';
 for(const node of [mount,frame,intro])set(node,'transition','none');
 const previous=window.presentationEffects;
 window.presentationEffects=(s,t)=>{previous?.(s,t);if(s!==scene)return;
  const track=window.demoAudioManifest?.slides?.[current];
  const at=track?.audioDuration??Math.max(0,Number(scene.dataset.duration)-1);
  const raw=Math.max(0,Math.min(1,(local-at)/.75));
  const p=matchMedia('(prefers-reduced-motion: reduce)').matches?Number(raw>0):1-Math.pow(1-raw,3);
  scene.classList.toggle('naming-expanded',raw>=1);
  scene.classList.toggle('intro-dismissed',raw>=1);
  set(mount,'left',mix(560,20,p));set(mount,'top',mix(170,20,p));set(mount,'width',mix(975,1560,p));set(mount,'height',mix(508,812,p));
  set(frame,'width','1560px');set(frame,'height','812px');set(frame,'transform-origin','top left');set(frame,'transform','scale('+(.625+.375*p)+')');
  set(intro,'display','block');set(intro,'visibility',raw>=1?'hidden':'visible');set(intro,'opacity',String(1-p));set(intro,'translate',(-40*p)+'px 0');
 };
})();
