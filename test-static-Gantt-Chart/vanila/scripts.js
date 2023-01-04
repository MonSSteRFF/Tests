const languageBtn = document.querySelectorAll(".header_language .language_btn");

languageBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    languageBtn.forEach(btnElem => btnElem.classList.remove('active'))
    e.currentTarget.classList.add('active');

    document.querySelector('html')
      .setAttribute('lang',
        e.currentTarget.getAttribute('lang')
      )
  })
})




let windowScroll = 0;
let ticking = false;
const animDuration = 1000;

const doAnimation = (e, windowScroll) => {
  const animBlocks = document.querySelectorAll('[class^="anim_"],[class*="anim_"]');

  animBlocks.forEach(animElem => {

console.log(windowScroll + window.innerHeight , animElem.offsetTop)

    if (windowScroll + window.innerHeight >= animElem.offsetTop){
      animElem.setAttribute('style', `transition-duration: ${animDuration}ms;`)
      animElem.classList.add('anim_end');
      animElem.classList.remove('anim_hide_bottom');
      // setTimeout(()=>{
      //   animElem.removeAttribute('style');
      //   animElem.classList.remove('anim_end');
      // }, animDuration)
    }
  })

}

document.addEventListener('scroll', (e) => {
  windowScroll = window.scrollY
  if (!ticking) {
    window.requestAnimationFrame(() => {
      doAnimation(e, windowScroll);
      ticking = false;
    });

    ticking = true;
  }

})