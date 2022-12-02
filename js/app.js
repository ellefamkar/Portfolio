gsap.registerPlugin(ScrollTrigger);

const h1s = document.querySelectorAll('h1');

const letters = new SplitText(h1s).chars;

[...h1s].forEach((h1) => {
	h1.style.display = 'block'
});

const to = gsap.from(letters, {
	y: 100,
	rotation: 10,
	duration: 2,
	stagger: 0.1,
	ease: "power3.inOut"
});

document.getElementById('restart').addEventListener('click', () => {
	to.restart();
});