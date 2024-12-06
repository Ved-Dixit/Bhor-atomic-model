document.addEventListener("DOMContentLoaded", () => {
    const sections = {
        Home: document.querySelector(".main"),
        History: document.querySelector(".his"),
        Theory: document.querySelector(".theory"),
        Strengths: document.querySelector(".strengths"),
        Limitations: document.querySelector(".limitations"),
        Simulation: document.querySelector(".simulations")
    };
    document.querySelectorAll("header pre").forEach(pre => {
        pre.addEventListener("click", () => {
            const section = sections[pre.textContent.trim()];
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
    const canvas = document.getElementById("atomCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const molecules = [];
    const numMolecules = 50;

    function initMolecules() {
        for (let i = 0; i < numMolecules; i++) {
            molecules.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                type: Math.random() < 0.5 ? 'NaCl' : 'H2O',
                speed: Math.random() * 2 + 1
            });
        }
    }

    function drawMolecules() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        molecules.forEach(molecule => {
            if (molecule.type === 'NaCl') {
                drawNaCl(molecule.x, molecule.y);
            } else {
                drawH2O(molecule.x, molecule.y);
            }
            molecule.y += molecule.speed;
            if (molecule.y > canvas.height) {
                molecule.y = -20;
                molecule.x = Math.random() * canvas.width;
            }
        });
    }

    function drawNaCl(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x + 7, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
        ctx.fill();
        ctx.closePath();
    }

    function drawH2O(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 150, 255, 0.7)";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x - 6, y - 4, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x + 6, y - 4, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
        ctx.fill();
        ctx.closePath();
    }

    function animate() {
        drawMolecules();
        requestAnimationFrame(animate);
    }
    initMolecules();
    animate();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    const backgroundCanvas = document.getElementById("backgroundCanvas");
    const bgCtx = backgroundCanvas.getContext("2d");

    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    function createParticle() {
        return {
            x: Math.random() * backgroundCanvas.width,
            y: Math.random() * backgroundCanvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        };
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }

    function drawParticles() {
        bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

        particles.forEach(particle => {
            bgCtx.beginPath();
            bgCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            bgCtx.fillStyle = particle.color;
            bgCtx.fill();

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > backgroundCanvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > backgroundCanvas.height) particle.speedY *= -1;
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();

    window.addEventListener('resize', () => {
        backgroundCanvas.width = window.innerWidth;
        backgroundCanvas.height = window.innerHeight;
    });
});  
