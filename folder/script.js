const canvas = document.getElementById('atomCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const orbits = [50, 100, 150, 200];
let currentLevel = 1;
let angle = 0;
function calculateEnergy(n) {
    return -13.6 / (n ** 2);
}
function drawAtom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
    for (let i = 0; i < orbits.length; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbits[i], 0, Math.PI * 2);
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.closePath();
    }
    const x = centerX + orbits[currentLevel - 1] * Math.cos(angle);
    const y = centerY + orbits[currentLevel - 1] * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'cyan';
    ctx.fill();
    ctx.closePath();
    angle += 0.05;
    if (angle > Math.PI * 2) angle = 0;
    requestAnimationFrame(drawAtom);
}
function simulateTransition() {
    const energyInput = document.getElementById('energyInput').value;
    const message = document.getElementById('message');

    if (!energyInput || energyInput <= 0) {
        message.textContent = 'Please enter a valid photon energy.';
        return;
    }

    const photonEnergy = parseFloat(energyInput);
    const currentEnergy = calculateEnergy(currentLevel);

    for (let i = currentLevel + 1; i <= orbits.length; i++) {
        const requiredEnergy = calculateEnergy(i) - currentEnergy;

        if (photonEnergy >= requiredEnergy) {
            currentLevel = i;
            break;
        }
    }

    if (currentLevel === orbits.length) {
        message.textContent = 'The electron is already at the highest energy level.';
    } else {
        message.textContent = `Electron transitioned to level ${currentLevel}.`;
    }
}
function simulateDeexcitation() {
    const energyInput = document.getElementById('energyInput').value;
    const message = document.getElementById('message');

    if (!energyInput || energyInput <= 0) {
        message.textContent = 'Please enter a valid photon energy.';
        return;
    }

    const photonEnergyLoss = parseFloat(energyInput);
    const currentEnergy = calculateEnergy(currentLevel);

    for (let i = currentLevel - 1; i >= 1; i--) {
        const requiredEnergy = currentEnergy - calculateEnergy(i);

        if (photonEnergyLoss >= requiredEnergy) {
            currentLevel = i;
            break;
        }
    }

    if (currentLevel === 1) {
        message.textContent = 'The electron is already at the lowest energy level.';
    } else {
        message.textContent = `Electron transitioned to level ${currentLevel}.`;
    }
}
function calculateThreshold() {
    const orbitFrom = parseInt(document.getElementById('orbitFrom').value);
    const orbitTo = parseInt(document.getElementById('orbitTo').value);
    const message = document.getElementById('message');

    if (orbitFrom >= orbitTo) {
        message.textContent = 'Invalid selection. "To Orbit" must be greater than "From Orbit".';
        return;
    }

    const energyFrom = calculateEnergy(orbitFrom);
    const energyTo = calculateEnergy(orbitTo);
    const thresholdEnergy = energyTo - energyFrom;

    message.textContent = `Threshold energy required: ${Math.abs(thresholdEnergy).toFixed(2)} eV`;
}
drawAtom();
