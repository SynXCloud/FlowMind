document.addEventListener('DOMContentLoaded', () => {
    // Add custom cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let isHovering = false;

    document.addEventListener('mousemove', e => {
        // Move dot instantly
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        // Move ring with slight delay
        cursor.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 150, fill: "forwards" });

        // Gamified Trail effect
        createTrail(e.clientX, e.clientY);
    });

    // Trail effect function
    function createTrail(x, y) {
        if(Math.random() > 0.3) return; // Reduce particles
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        document.body.appendChild(particle);
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.5 },
            { transform: `translate(-50%, ${-50 + (Math.random() * 40 - 20)}px) scale(0)`, opacity: 0 }
        ], { duration: 600, easing: 'ease-out' });
        
        setTimeout(() => particle.remove(), 600);
    }

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive, .kanban-card, .price-card, .tab-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-dot-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            isHovering = false;
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-dot-hover');
        });
    });

    // Make elements feel more "gamified" (e.g. popping on click)
    document.querySelectorAll('button, .btn').forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'scale(1)';
        });
    });
});
