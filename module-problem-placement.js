// Keep problem/solution context below each module's existing introduction.
(() => {
 const definitions=[
 ['.kb-showcase-intro','手册经验分散，资料难以统一管理和复用。'],
 ['.qa-scene .split>div:first-child','查手册耗时，答案缺少可靠依据。'],
 ['.coach-intro','训练评语零散，能力变化难以追踪。'],
 ['.training-report-intro','飞行表现难以全面回顾，训练缺少针对性。'],
 ['.data-query-intro','取数繁琐，指标趋势和关注项难以快速掌握。']
 ];
 definitions.forEach(([selector,text])=>document.querySelectorAll(selector).forEach(holder=>{const note=document.createElement('div');note.className='module-problem-note';note.innerHTML='<small>解决机长的问题</small><p>'+text+'</p>';holder.append(note);}));
 document.querySelectorAll('.kb-module-summary,.kb-simple-steps').forEach(el=>el.remove());
 const style=document.createElement('style');style.textContent='.module-problem-note{margin-top:25px;padding:16px 19px;border-radius:8px;border:1px solid #ffffff22;background:#ffffff08;text-align:left;max-width:100%}.module-problem-note>small{display:block;color:#ffc402!important;font-size:14px!important;line-height:1.5;letter-spacing:1px;margin:0 0 8px!important}.module-problem-note>p{font-size:18px!important;line-height:1.7!important;color:#ffffffd9!important;margin:0!important;letter-spacing:0}.kb-showcase-intro .module-problem-note{margin-top:28px}.data-query-intro .module-problem-note{margin-top:22px}.training-report-intro .module-problem-note{margin-top:22px}';document.head.append(style);
})();
