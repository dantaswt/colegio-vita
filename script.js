const header=document.querySelector('.site-header');
const menuBtn=document.querySelector('.menu-btn');
const mobileMenu=document.getElementById('mobileMenu');

function syncHeader(){
  header.classList.toggle('is-scrolled',window.scrollY>24);
}
syncHeader();
window.addEventListener('scroll',syncHeader,{passive:true});

menuBtn?.addEventListener('click',()=>{
  const open=menuBtn.getAttribute('aria-expanded')==='true';
  menuBtn.setAttribute('aria-expanded',String(!open));
  mobileMenu?.classList.toggle('open',!open);
  mobileMenu?.setAttribute('aria-hidden',String(open));
  document.body.style.overflow=!open?'hidden':'';
});

mobileMenu?.querySelectorAll('a').forEach(link=>{
  link.addEventListener('click',()=>{
    menuBtn?.setAttribute('aria-expanded','false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  });
});

const revealItems=[...document.querySelectorAll('.section-head,.feature-strip article,.segment-card,.experience-visual,.experience-copy,.news-card')];
if('IntersectionObserver'in window){
  revealItems.forEach(el=>el.classList.add('reveal'));
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  revealItems.forEach(el=>observer.observe(el));
}
