const journal=document.getElementById('journal');
const result=document.getElementById('result');
const status=document.getElementById('status');
const positiveWords=['happy','good','great','love','lovely','excited','calm','peaceful','proud','grateful','hope','hopeful','fun','better','okay','ok','smile','smiling','enjoy','enjoyed','success','relaxed','confident'];
const negativeWords=['sad','bad','angry','hate','lonely','tired','exhausted','stressed','stress','anxious','anxiety','worried','worry','cry','crying','hurt','hopeless','pointless','empty','fail','failed','failure','overwhelmed','upset','terrible','awful','scared','fear'];

function analyzeText(text){
  const words=text.toLowerCase().match(/[a-z']+/g)||[];
  let pos=0,neg=0;
  words.forEach(w=>{if(positiveWords.includes(w))pos++;if(negativeWords.includes(w))neg++;});
  const total=Math.max(words.length,1);
  let positive=Math.round((pos/Math.max(pos+neg,1))*70+15);
  let negative=Math.round((neg/Math.max(pos+neg,1))*70+10);
  if(pos===0&&neg===0){positive=25;negative=20}
  if(pos>neg){positive=Math.min(75,positive+10);negative=Math.max(8,negative-5)}
  if(neg>pos){negative=Math.min(75,negative+10);positive=Math.max(8,positive-5)}
  let neutral=Math.max(100-positive-negative,5);
  const sum=positive+neutral+negative;
  positive=Math.round(positive*100/sum); negative=Math.round(negative*100/sum); neutral=100-positive-negative;
  return {positive,neutral,negative,pos,neg};
}

document.getElementById('analyzeBtn').addEventListener('click',()=>{
  const text=journal.value.trim();
  if(text.length<10){status.textContent='Write a little more so the prototype can analyze your check-in.';return}
  status.textContent='Analyzing your communication...';
  setTimeout(()=>{
    const r=analyzeText(text);
    document.getElementById('positive').textContent=r.positive+'%';
    document.getElementById('neutral').textContent=r.neutral+'%';
    document.getElementById('negative').textContent=r.negative+'%';
    let mood,emoji,message;
    if(r.negative>r.positive+15){mood='More negative language detected';emoji='🌧️';message='Your recent words contain more negative language than positive language. Consider taking a small pause, checking in with yourself, or talking to someone you trust.'}
    else if(r.positive>r.negative+15){mood='More positive language detected';emoji='🌤️';message='Your check-in contains more positive language. Keep noticing what helps you feel supported and grounded.'}
    else{mood='Mostly balanced language';emoji='🌿';message='Your communication looks fairly balanced in this check-in. One entry cannot describe your wellbeing, so focus on patterns over time.'}
    document.getElementById('mood').textContent=mood;
    document.getElementById('emoji').textContent=emoji;
    document.getElementById('message').textContent=message;
    result.classList.remove('hidden');
    const old=Number(localStorage.getItem('traumabond_checkins')||0)+1;
    localStorage.setItem('traumabond_checkins',old);
    document.getElementById('checkins').textContent=old;
    const bars=document.querySelectorAll('#bars span');
    const idx=(old-1)%bars.length;
    bars[idx].style.height=Math.min(90,Math.max(20,r.negative+20))+'%';
    status.textContent='Analysis complete.';
  },450);
});

document.getElementById('checkins').textContent=localStorage.getItem('traumabond_checkins')||0;
