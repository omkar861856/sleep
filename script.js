function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

function calculateBedtime() {
    const wakeInput = document.getElementById('wake-time').value;
    if (!wakeInput) return;

    const [h, m] = wakeInput.split(':');
    const wakeTime = new Date();
    wakeTime.setHours(h, m, 0, 0);

    const results = document.getElementById('bedtime-results');
    results.innerHTML = '';

    // Calculate 6, 5, 4, 3 cycles back (90 mins each)
    // Adding 15 mins to fall asleep
    const fallAsleepTime = 15;

    [6, 5, 4, 3].forEach(cycles => {
        const bedtime = new Date(wakeTime.getTime() - (cycles * 90 * 60000) - (fallAsleepTime * 60000));
        results.innerHTML += `
            <div class="time-slot">
                <span class="time">${formatTime(bedtime)}</span>
                <span class="desc">${cycles} Cycles (${cycles*1.5}h)</span>
            </div>
        `;
    });
}

function calculateWakeTime() {
    const now = new Date();
    const results = document.getElementById('waketime-results');
    results.innerHTML = '';

    const fallAsleepTime = 15;
    const startTime = new Date(now.getTime() + (fallAsleepTime * 60000));

    [3, 4, 5, 6].forEach(cycles => {
        const waketime = new Date(startTime.getTime() + (cycles * 90 * 60000));
        results.innerHTML += `
            <div class="time-slot">
                <span class="time">${formatTime(waketime)}</span>
                <span class="desc">${cycles} Cycles (${cycles*1.5}h)</span>
            </div>
        `;
    });
}
