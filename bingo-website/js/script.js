document.getElementById('new-game').addEventListener('click', generateBingoBoard);

const items = `
Reimagine
Redesign
Reconstruct
Refigure
Reinterpret 
Rethink
Re-appropriate
Reconfigure
Recentralise
Refocus
Recentre
Recompose
Recontextualize 
Deconstruct
Deconfigure
De-personalise
Decentralise
Decentre
Decomposition
Decolonization
Unthink
Unlearn
Narrative
Lived experience
Storytelling
Juxtapose
Abject
Affect/effect
Revolutionise
Anthropocene
Era
Our time
Emerging
AI
Contrasts
Ephemeral
Transitive
Transitory
Contemporary
Episodic
Impermanent
Permanence
Soil
Rhizome
Rhizomatic
Platform(s)
Sustaining
Phenomenological
Immersive
Immersion
Liminal
Found objects/Found footage
Minimalistic
Biopolitics
Radically
Subversive
Displaces
Spatial installation
Enfold
Paradigm
Questions
Virtual
Contemplates
Panopticon
Cyber(borg)
Tech
Electric
Indigenous 
Practices 
Eclectic 
Local
Community 
Communicates 
Sensing 
Listening practices
Ecologies 
Discourse
Practice
Speculating
Eco feminism 
Care 
Deals with
In conversation with [...]
The artist [...] asks/is/attempts/conveis
Poses the […]
Explores the interaction between [...] and [...]
Queering
Caring
Post-internet
Posthuman
Post-truth 
Framework
Interpretations
Reflective 
Commentary 
Gaze
`.trim().split('\n').map(item => item.trim());

function generateBingoBoard() {
    const bingoBoard = document.getElementById('bingo-board');
    bingoBoard.innerHTML = '';
    const selectedItems = getRandomItems(items, 24); // 24 items + 1 free space
    let index = 0;

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';
            if (i === 2 && j === 2) {
                cell.textContent = 'Free Space';
                cell.classList.add('selected');
                cell.classList.add('free-space');
            } else {
                cell.textContent = selectedItems[index++];
            }
            cell.addEventListener('click', () => {
                if (!cell.classList.contains('free-space')) {
                    cell.classList.toggle('selected');
                    checkBingo();
                }
            });
            bingoBoard.appendChild(cell);
        }
    }
}

function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function checkBingo() {
    const cells = document.querySelectorAll('.bingo-cell');
    const selectedCells = Array.from(cells).map(cell => cell.classList.contains('selected'));
    const size = 5;

    // Check rows
    for (let i = 0; i < size; i++) {
        if (selectedCells.slice(i * size, i * size + size).every(Boolean)) {
            triggerConfetti();
            return;
        }
    }

    // Check columns
    for (let i = 0; i < size; i++) {
        if (selectedCells.filter((_, index) => index % size === i).every(Boolean)) {
            triggerConfetti();
            return;
        }
    }

    // Check diagonals
    if (selectedCells.filter((_, index) => index % (size + 1) === 0).every(Boolean) ||
        selectedCells.filter((_, index) => index % (size - 1) === 0 && index !== 0 && index !== size * size - 1).every(Boolean)) {
        triggerConfetti();
        return;
    }
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}