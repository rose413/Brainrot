let time = 0;
let invertLevel = 0;

// Track mouse and keyboard events
function trackMouseandKeyboard() {
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keypress', resetTimer);
}

function resetTimer() {
    time = 0;
}

// Calls on function to start the chaos
trackMouseandKeyboard();
setInterval(() => {
    time += 1000;
    applyChaos(time);
}, 1000);

// Apply the simulated effects after certain times
function applyChaos(elapsed) {
    if (elapsed > 60000) startBlur(); // Start blur after 1 minute
    if (elapsed > 120000) startInversion(); // Start inversion after 2 minutes
    if (elapsed > 180000) scrambleText(); // Start text scrambling after 3 minutes
  }
  
function startBlur() {
   document.body.style.filter = `blur(5px)`;
}
  
function startInversion() {
   document.body.style.filter += `invert(${invertLevel}%)`;
   invertLevel += 5; 
}
  
function scrambleText() {
    document.body.querySelectorAll('*').forEach(element => {
      if (element.innerText) {
        element.innerText = element.innerText
          .split('')
          .map(char => (Math.random() > 0.3 ? char : String.fromCharCode(97 + Math.floor(Math.random() * 26))))
          .join('');
      }
    });
}

function placeCat() {
    const cat = document.createElement('img');
    cat.src = 'images/cat.jpg'; // Use a small, fun cat image
    cat.style.position = 'absolute';
    cat.style.width = '50px'; // Adjust size
    cat.style.cursor = 'pointer';
    cat.style.top = `${Math.max(0, Math.random() * (window.innerHeight - 50))}px`;
    cat.style.left = `${Math.max(0, Math.random() * (window.innerWidth - 50))}px`;
    cat.onclick = unblurPage; // Add functionality to unblur when clicked
    document.body.appendChild(cat);
}
placeCat();

setInterval(() => {
    document.querySelector('img[src="images/cat.jpg"]').remove();
    placeCat();
  }, 3000); // Moves every 3 seconds

function unblurPage() {
   document.body.style.filter = 'none';
   alert('You found the cat! The page is now clear.');
   const catImage = document.querySelector('img[src="images/cat.jpg"]').remove(); // Remove cat
   if (catImage) {
    catImage.remove(); // Remove the cat when clicked
  }
}