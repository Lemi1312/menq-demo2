// MENQ v7 - final tweaks: view pill at top-right of cards, overlay items with chips and no thumbnails
const CATEGORIES = [
  {id:'hot', title:'Hot Meals', img:'images/hot.jpg'},
  {id:'salads', title:'Salads', img:'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=60'},
  {id:'desserts', title:'Desserts', img:'images/desserts.jpg'},
  {id:'breakfast', title:'Breakfasts', img:'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=60'}
];

const MENU = [
  {id:1, name:'Margherita', desc:'Tanko testo, paradajz sos, mocarela', price:450, cat:'hot', kcal:780, prep:'15 min'},
  {id:2, name:'Ćevapi (6 kom)', desc:'Mleveno meso, lepinja, kajmak', price:680, cat:'hot', kcal:640, prep:'12 min'},
  {id:3, name:'Caesar salata', desc:'Piletina, salata, parmezan', price:560, cat:'salads', kcal:420, prep:'8 min'},
  {id:4, name:'Tiramisu', desc:'Domaći tiramisu', price:350, cat:'desserts', kcal:520, prep:'10 min'},
  {id:5, name:'Espreso', desc:'Mali espreso', price:150, cat:'breakfast', kcal:5, prep:'2 min'},
  {id:6, name:'French Toast', desc:'Sa javorovim sirupom', price:420, cat:'breakfast', kcal:610, prep:'10 min'}
];

// DOM refs
const categoriesEl = document.getElementById('categories');
const catOverlay = document.getElementById('catOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayContent = document.getElementById('overlayContent');
const backBtn = document.getElementById('backBtn');

function renderCategories(){
  categoriesEl.innerHTML='';
  CATEGORIES.forEach((c, idx)=>{
    const div = document.createElement('div');
    div.className='cat';
    div.style.backgroundImage = `linear-gradient(rgba(5,64,60,0.14), rgba(5,64,60,0.14)), url(${c.img})`;
    div.innerHTML = `<h3>${c.title}</h3><span class="pill">View</span>`;
    // stagger in
    div.style.opacity = 0; div.style.transform = 'translateY(8px)';
    setTimeout(()=>{ div.style.transition = 'opacity .45s ease, transform .45s cubic-bezier(.2,.9,.3,1)'; div.style.opacity = 1; div.style.transform = 'translateY(0)'; }, idx*120);
    div.addEventListener('click', ()=> openCategory(c.id));
    categoriesEl.appendChild(div);
  });
}

function openCategory(catId){
  const cat = CATEGORIES.find(c=>c.id===catId);
  overlayTitle.textContent = cat.title;
  catOverlay.style.background = `linear-gradient(180deg, rgba(5,64,60,0.92), rgba(7,30,29,0.98)), url(${cat.img}) center/cover fixed`;
  overlayContent.innerHTML = '';
  const items = MENU.filter(it=>it.cat === catId);
  if(items.length===0){
    overlayContent.innerHTML = '<p style="color:#fff">Nema artikala u ovoj kategoriji.</p>';
  } else {
    items.forEach((it, idx)=>{
      const el = document.createElement('div');
      el.className = 'overlay-item';
      el.style.animationDelay = (idx*70)+'ms';
      el.innerHTML = `
  <div class="meta-left">
    <h4>${it.name}</h4>
    <p class="meta-small">${it.desc}</p>
    <div class="price">${it.price} RSD</div>
  </div>
  <div class="right-chips">
    <div class="chip">${it.kcal} kcal</div>
    <div class="chip">≈ ${it.prep}</div>
  </div>
`;
      overlayContent.appendChild(el);
    });
  }
  catOverlay.classList.remove('hidden');
  setTimeout(()=>catOverlay.classList.add('show'),20);
  document.getElementById('mainView').style.display = 'none';
  window.scrollTo({top:0,behavior:'smooth'});
}

function closeOverlay(){
  catOverlay.classList.remove('show');
  setTimeout(()=>{ catOverlay.classList.add('hidden'); }, 320);
  document.getElementById('mainView').style.display = 'block';
  window.scrollTo({top:0,behavior:'smooth'});
}

backBtn.addEventListener('click', closeOverlay);

document.addEventListener('DOMContentLoaded', renderCategories);


document.addEventListener('DOMContentLoaded', function(){  });

function init(){ renderCategories(); }
document.addEventListener('DOMContentLoaded', init);
