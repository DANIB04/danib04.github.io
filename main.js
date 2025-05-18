const {
    css,
    timeline,
    spring,
    easing,
    value,
    tween,
    styler,
    parallel,
    stagger,
} = window.popmotionXL;

const ns = 'text';
const text = document.querySelector(`#${ns}`);
const texts = Array.from(document.querySelectorAll(`#${ns}__textWrap > g`));
const bg = document.querySelector('.bg');
const textStylers = texts.map(styler);

const textGradient01 = document.querySelector(`#${ns}__gradient--01`);
gradientArr = Array.from(textGradient01.children);

textStylers.forEach((styler) => {
    styler.set({ scale: 5, opacity: 0 });
})

const scaleTween = tween({
    from: {opacity: 0, scale: 5, },
    to: {opacity: 1, scale: 1, },
    duration: 900,
    ease: easing.easeIn,
});

const animations = Array(textStylers.length)
    .fill(scaleTween);

const textGradient = {
    start: {
        bg1: 'rgba(249,227,204,0.9)',
        bg2: 'rgba(249,189,149,0.9)',
        bg3: 'rgba(237,102,69,0.9)', 
    },
    end: {
        bg1: 'rgba(21,179,249,1)',
        bg2: 'rgba(199,183,217,1)',
        bg3: 'rgba(246,62,93,1)',
    },    
};

const setGradient = (v) => {    
    gradientArr[0].setAttribute('stop-color', v.bg1);
    gradientArr[1].setAttribute('stop-color', v.bg2);
    gradientArr[2].setAttribute('stop-color', v.bg3);  
};

const gradientTween = tween({
    from: textGradient.start,
    to: textGradient.end,
    duration: 100,
    ease: easing.linear,
});

const animationStart = () => {
    stagger(animations, 100)
        .start({
            update: (v) => v.forEach((x, i) => textStylers[i].set(x)),
            complete: () => gradientTween.start(setGradient),
        });
}

// Start the animation when the image is fully loaded
const imgLoad = new Image();
imgLoad.onload = () => {
    bg.dataset.loaded = true;
    bg.setAttribute('src', bg.getAttribute('data-src'));
    setTimeout(() => {
        animationStart();
    }, 300)
    
}
imgLoad.src = bg.getAttribute('data-src');

text.addEventListener('click', () => {
    setGradient(textGradient.start);
    textStylers.forEach((styler) => {
        styler.set({ scale: 5, opacity: 0 });
    })
    animationStart();
});

