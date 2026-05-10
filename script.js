class EmotionalTree {
    constructor() {
        this.config = {
            trunkColor: '#6B5344',
            leavesColor: '#2ecc71',
            flowersColor: '#e74c3c',
            message: 'Un árbol que crece con cada momento compartido. Sus raíces representan los cimientos de nuestros recuerdos, sus ramas simbolizan el crecimiento juntos, y sus hojas son los hermosos momentos que nunca olvidaremos. ¡Gracias por cada año compartido! 🌳✨',
            years: 5
        };
        
        this.animationRunning = false;
        this.messageIndex = 0;
        this.yearCounter = 0;
        
        this.initElements();
        this.setupEventListeners();
        this.startAnimation();
    }
    
    initElements() {
        this.trunk = document.querySelector('.trunk');
        this.branches = document.querySelectorAll('.branch');
        this.leaves = document.querySelectorAll('.leaf');
        this.flowers = document.querySelectorAll('.flower');
        this.messageReveal = document.getElementById('messageReveal');
        this.yearCounterDisplay = document.getElementById('yearCounter');
        this.momentText = document.getElementById('momentText');
        
        this.treeColorInput = document.getElementById('treeColor');
        this.leavesColorInput = document.getElementById('leavesColor');
        this.messageInput = document.getElementById('messageInput');
        this.yearsInput = document.getElementById('yearsInput');
        this.applyBtn = document.getElementById('applyBtn');
        this.resetBtn = document.getElementById('resetBtn');
    }
    
    setupEventListeners() {
        this.applyBtn.addEventListener('click', () => this.applyCustomization());
        this.resetBtn.addEventListener('click', () => this.reset());
    }
    
    startAnimation() {
        if (this.animationRunning) return;
        this.animationRunning = true;
        
        // Reiniciar elementos visuales
        this.resetVisuals();
        
        // Iniciar animaciones secuenciales
        setTimeout(() => this.revealMessage(), 500);
        setTimeout(() => this.animateCounter(), 6500);
    }
    
    revealMessage() {
        this.messageReveal.innerHTML = '';
        this.messageIndex = 0;
        
        const message = this.config.message;
        const typeSpeed = 30; // milisegundos por carácter
        
        const typeCharacter = () => {
            if (this.messageIndex < message.length) {
                const char = message[this.messageIndex];
                
                if (char === '\n') {
                    this.messageReveal.innerHTML += '<br>';
                } else {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.animation = `fadeInChar 0.5s ease-out ${this.messageIndex * 0.02}s both`;
                    this.messageReveal.appendChild(span);
                }
                
                this.messageIndex++;
                setTimeout(typeCharacter, typeSpeed);
            }
        };
        
        // Agregar animación CSS para los caracteres
        if (!document.getElementById('charAnimation')) {
            const style = document.createElement('style');
            style.id = 'charAnimation';
            style.textContent = `
                @keyframes fadeInChar {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        typeCharacter();
    }
    
    animateCounter() {
        this.yearCounter = 0;
        const targetYears = this.config.years;
        const duration = 2000; // 2 segundos
        const increment = targetYears / (duration / 50);
        
        const updateCounter = () => {
            this.yearCounter += increment;
            
            if (this.yearCounter >= targetYears) {
                this.yearCounter = targetYears;
            } else {
                setTimeout(updateCounter, 50);
            }
            
            // Actualizar visualización con animación
            this.yearCounterDisplay.textContent = Math.floor(this.yearCounter);
            this.yearCounterDisplay.style.animation = 'none';
            setTimeout(() => {
                this.yearCounterDisplay.style.animation = 'counterPulse 0.5s ease';
            }, 10);
            
            // Cambiar texto de momentos
            const momentTexts = [
                'momentos mágicos',
                'risas compartidas',
                'recuerdos especiales',
                'abrazos infinitos',
                'sueños juntos'
            ];
            
            const index = Math.floor(this.yearCounter) % momentTexts.length;
            this.momentText.textContent = momentTexts[index];
        };
        
        updateCounter();
    }
    
    resetVisuals() {
        // Resetear animaciones de ramas
        this.branches.forEach(branch => {
            branch.style.animation = 'none';
            setTimeout(() => {
                branch.style.animation = '';
            }, 10);
        });
        
        // Resetear hojas
        this.leaves.forEach(leaf => {
            leaf.style.animation = 'none';
            leaf.style.opacity = '0';
            setTimeout(() => {
                leaf.style.animation = '';
            }, 10);
        });
        
        // Resetear flores
        this.flowers.forEach(flower => {
            flower.style.animation = 'none';
            flower.style.opacity = '0';
            setTimeout(() => {
                flower.style.animation = '';
            }, 10);
        });
        
        // Resetear mensaje
        this.messageReveal.innerHTML = '';
        this.messageIndex = 0;
    }
    
    applyCustomization() {
        // Actualizar configuración
        this.config.trunkColor = this.treeColorInput.value;
        this.config.leavesColor = this.leavesColorInput.value;
        this.config.message = this.messageInput.value || this.config.message;
        this.config.years = parseInt(this.yearsInput.value) || 5;
        
        // Aplicar colores
        this.trunk.style.fill = this.config.trunkColor;
        
        this.branches.forEach(branch => {
            const randomShade = this.adjustColor(this.config.trunkColor, -20);
            branch.style.stroke = randomShade;
        });
        
        this.leaves.forEach(leaf => {
            leaf.style.fill = this.config.leavesColor;
        });
        
        // Reiniciar animación
        this.animationRunning = false;
        this.startAnimation();
        
        // Mostrar feedback
        this.showNotification('¡Cambios aplicados! 🎨');
    }
    
    adjustColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, Math.max(0, (num >> 16) + amt));
        const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
        const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
    
    reset() {
        // Resetear inputs
        this.treeColorInput.value = '#6B5344';
        this.leavesColorInput.value = '#2ecc71';
        this.messageInput.value = '';
        this.yearsInput.value = '5';
        
        // Resetear configuración
        this.config = {
            trunkColor: '#6B5344',
            leavesColor: '#2ecc71',
            flowersColor: '#e74c3c',
            message: 'Un árbol que crece con cada momento compartido. Sus raíces representan los cimientos de nuestros recuerdos, sus ramas simbolizan el crecimiento juntos, y sus hojas son los hermosos momentos que nunca olvidaremos. ¡Gracias por cada año compartido! 🌳✨',
            years: 5
        };
        
        // Aplicar colores por defecto
        this.trunk.style.fill = this.config.trunkColor;
        this.leaves.forEach(leaf => {
            leaf.style.fill = this.config.leavesColor;
        });
        
        // Reiniciar animación
        this.animationRunning = false;
        this.startAnimation();
        
        this.showNotification('¡Árbol reiniciado! 🌳');
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            font-weight: bold;
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
}

// Agregar animaciones de notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    new EmotionalTree();
    
    // Efecto de partículas flotantes (opcional, para más magia)
    createFloatingParticles();
});

function createFloatingParticles() {
    const container = document.querySelector('.tree-container');
    const particleCount = 10;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 2}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);
    }
}
