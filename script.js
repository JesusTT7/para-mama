let state = {
    message: "Para la mujer más increíble de mi vida:\n\nGracias por tu amor incondicional, tus cuidados y tu paciencia.\n\nEres mi mayor inspiración y mi refugio más seguro.\n\n¡Feliz Día de las Madres!",
    startDate: new Date("2024-05-10"),
    counterLabel: "Mi vida junto a ti comenzó hace...",
    trunkColor: "#8B4513",
    colors: {
        red: "#DC143C",
        pink: "#FF69B4",
        yellow: "#FFD700",
        purple: "#DDA0DD"
    },
    flowerCount: 150
};

function init() {
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 2);
    document.getElementById('startDate').valueAsDate = defaultDate;
    state.startDate = defaultDate;

    revealMessage();
    generateFlowers();
    updateTimer();
    setInterval(updateTimer, 1000);
}

function revealMessage() {
    const messageElement = document.getElementById('message');
    const text = state.message;
    messageElement.textContent = '';
    
    let index = 0;
    const speed = 30;
    
    function typeMessage() {
        if (index < text.length) {
            messageElement.textContent += text[index];
            index++;
            setTimeout(typeMessage, speed);
        }
    }
    
    typeMessage();
}

function generateFlowers() {
    const container = document.getElementById('flowersContainer');
    container.innerHTML = '';
    
    const colors = [state.colors.red, state.colors.pink, state.colors.yellow, state.colors.purple];
    const heartPattern = generateHeartShape(state.flowerCount);
    
    heartPattern.forEach((pos, index) => {
        const flower = createFlower(pos.x, pos.y, colors[Math.floor(Math.random() * colors.length)]);
        flower.style.animationDelay = `${index * 20}ms`;
        container.appendChild(flower);
    });
    
    document.querySelector('.trunk').setAttribute('fill', state.trunkColor);
}

function generateHeartShape(count) {
    const points = [];
    const centerX = 150;
    const centerY = 120;
    const scaleX = 60;
    const scaleY = 60;
    
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 40 + 20;
        
        let x = centerX + Math.sin(angle) ** 3 * scaleX * radius / 40;
        let y = centerY - (Math.cos(angle) - 0.25 * Math.cos(2 * angle)) * scaleY * radius / 40;
        
        x += (Math.random() - 0.5) * 10;
        y += (Math.random() - 0.5) * 10;
        
        points.push({ x, y });
    }
    
    return points;
}

function createFlower(x, y, color) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.setAttribute('class', 'flower');
    svg.setAttribute('transform', `translate(${x}, ${y})`);
    
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const petX = Math.cos(angle) * 8;
        const petY = Math.sin(angle) * 8;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', petX);
        circle.setAttribute('cy', petY);
        circle.setAttribute('r', '6');
        circle.setAttribute('fill', color);
        
        svg.appendChild(circle);
    }
    
    const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    center.setAttribute('cx', '0');
    center.setAttribute('cy', '0');
    center.setAttribute('r', '4');
    center.setAttribute('fill', '#FFD700');
    svg.appendChild(center);
    
    return svg;
}

function updateTimer() {
    const now = new Date();
    const start = state.startDate;
    const diff = now - start;
    
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalYears = Math.floor(totalDays / 365.25);
    
    const years = totalYears;
    const hours = Math.floor((totalHours % 24));
    const minutes = Math.floor((totalMinutes % 60));
    const seconds = totalSeconds % 60;
    
    animateNumber('years', years);
    animateNumber('hours', hours);
    animateNumber('minutes', minutes);
    animateNumber('seconds', seconds);
    
    document.getElementById('counterLabel').textContent = state.counterLabel;
}

function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== newValue) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'countPulse 0.5s ease-out';
            element.textContent = String(newValue).padStart(2, '0');
        }, 10);
    } else {
        element.textContent = String(newValue).padStart(2, '0');
    }
}

function applyChanges() {
    state.message = document.getElementById('messageInput').value;
    state.startDate = document.getElementById('startDate').valueAsDate || new Date();
    state.counterLabel = document.getElementById('counterLabel').value;
    state.trunkColor = document.getElementById('trunkColor').value;
    state.colors.red = document.getElementById('colorRed').value;
    state.colors.pink = document.getElementById('colorPink').value;
    state.colors.yellow = document.getElementById('colorYellow').value;
    state.colors.purple = document.getElementById('colorPurple').value;
    state.flowerCount = parseInt(document.getElementById('flowerCount').value);
    
    revealMessage();
    generateFlowers();
    updateTimer();
    
    alert('✨ ¡Cambios aplicados correctamente! 🌸');
}

function downloadCard() {
    alert('📥 Para descargar: Usa tu navegador (botón derecho > Captura de pantalla) o copia como imagen con Print Screen.');
}

document.addEventListener('DOMContentLoaded', init);
