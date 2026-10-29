// Keep captions readable on one line by sequencing short clauses, never clipping text.
(() => {
 const caption=document.getElementById('caption');if(!caption)return;
 const style=document.createElement('style');style.textContent='#caption{white-space:nowrap!important;line-height:1.5!important;overflow:hidden;left:6%!important;right:6%!important;font-size:clamp(12px,1.3vw,18px)!important;min-height:0}';document.head.append(style);
 const context=document.createElement('canvas').getContext('2d');let cacheKey='',chunks=[];
 function split(text,width){
  const result=[];
  const limit=Math.min(width,context.measureText('汉'.repeat(30)).width);
  const finish=line=>{line=line.trim().replace(/[，、；：,;:。！？.!?]+$/g,'');if(line)result.push(line+'。');};
  // Every spoken sentence is its own caption; never combine adjacent sentences.
  for(const sentence of text.match(/[^。！？!?]+[。！？!?]?/g)||[text]){
   if(sentence.trim()==='召回测试，输入测试问题，展示系统返回的召回切片列表，及其与问题的相关性。'){result.push(sentence.trim());continue;}
   let line='';
   for(const clause of sentence.replace(/[。！？!?]+$/,'').match(/[^，；：,;:]+[，；：,;:]?/g)||[]){
    if(line&&context.measureText(line+clause+'。').width>limit){finish(line);line='';}
    for(const char of clause){
     if(line&&context.measureText(line+char+'。').width>limit){finish(line);line='';}
     line+=char;
    }
   }
   finish(line);
  }
  return result;
 }

 const prior=window.presentationEffects;window.presentationEffects=(scene,t)=>{prior?.(scene,t);if(scene.dataset.silent==='true'){caption.textContent='';return;}const item=window.demoAudioManifest?.slides?.[current];if(item?.captionGroups?.length){const group=[...item.captionGroups].reverse().find(g=>t>=g.start)||item.captionGroups[0];caption.textContent=group.text;const width=innerWidth*.88-40;context.font='18px '+getComputedStyle(caption).fontFamily;const fit=Math.min(18,width/Math.max(1,context.measureText(group.text).width)*18);caption.style.setProperty('font-size',fit+'px','important');return;}caption.style.removeProperty('font-size');const text=(item?.text||voices[current]||caption.textContent).replace(/\s+/g,' ').trim();if(!text)return;const computed=getComputedStyle(caption);context.font=computed.font||`${computed.fontSize} ${computed.fontFamily}`;const width=Math.max(60,innerWidth*.88-40);const key=text+'|'+width+'|'+context.font;if(key!==cacheKey){cacheKey=key;chunks=split(text,width);}const duration=Math.max(.1,item?.audioDuration||Number(scene.dataset.duration));const length=chunks.reduce((n,p)=>n+p.length,0);let position=Math.min(.999999,Math.max(0,t/duration))*length,index=0;while(index<chunks.length-1&&position>=chunks[index].length){position-=chunks[index].length;index++;}caption.textContent=chunks[index]||'';};
})();
