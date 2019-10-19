const robot = require('robotjs');
const { ipcRenderer } = require('electron');

let status = true;
ipcRenderer.on('running', function(event, value){
    if (value) {
        document.querySelector('#start').click();
    } else {
        document.querySelector('#stop').click();
    }
})

document.querySelector('#stop').addEventListener('click', () => {
    document.querySelector('#start').disabled = false;
    document.querySelector('#stop').disabled = true;
    status = false;
    flushTimeOuts();
});

document.querySelector('#start').addEventListener('click', () => {
    status = true;
    document.querySelector('#start').disabled = true;
    document.querySelector('#stop').disabled = false;
    if (document.querySelector('#f1-enable').checked) {
        if (!document.querySelector('#random-f1').checked) {
            if (!(Number(document.querySelector('#f1-interval').value) > 0)) {
                document.querySelector('#f1-interval').classList.add('is-invalid');
                return;
            } else {
                document.querySelector('#f1-interval').classList.remove('is-invalid');
                (function setAlarm() {
                    if (!status) {
                        return;
                    }
                    let interval = Number(document.querySelector('#f1-interval').value);
                    robot.keyTap('f1');
                    setTimeout(setAlarm, interval);
                })();
            }
        }

        if (document.querySelector('#random-f1').checked) {
            if (!(Number(document.querySelector('#f1-interval-from').value) > 0)) {
                document.querySelector('#f1-interval-from').classList.add('is-invalid');
                return;
            } else {
                document.querySelector('#f1-interval-from').classList.remove('is-invalid');
            }
            if (!(Number(document.querySelector('#f1-interval-to').value) > 0) && (Number(document.querySelector('#f1-interval-to').value) > (Number(document.querySelector('#f1-interval-from').value)))) {
                document.querySelector('#f1-interval-to').classList.add('is-invalid');
                return;
            } else {
                document.querySelector('#f1-interval-to').classList.remove('is-invalid');
            }

            if ((Number(document.querySelector('#f1-interval-from').value) > 0) && (Number(document.querySelector('#f1-interval-to').value) > 0)) {
                (function setAlarm() {
                    if (!status) {
                        return;
                    }
                    let interval = Math.random() * (Number(document.querySelector('#f1-interval-to').value) - Number(document.querySelector('#f1-interval-from').value)) + Number(document.querySelector('#f1-interval-from').value);
                    robot.keyTap('f1');
                    setTimeout(setAlarm, interval);
                })();
            }
        }
    }



    if (document.querySelector('#right-click-enable').checked) {
        if (!document.querySelector('#random-right-click').checked) {
            if (!(Number(document.querySelector('#right-click-interval').value) > 0)) {
                document.querySelector('#right-click-interval').classList.add('is-invalid');
                return;
            } else {
                document.querySelector('#right-click-interval').classList.remove('is-invalid');
                (function setAlarm() {
                    if (!status) {
                        return;
                    }
                    let interval = Number(document.querySelector('#right-click-interval').value);
                    console.log('right-click');
                    robot.mouseClick('right');
                    setTimeout(setAlarm, interval);
                })();
            }
        }

        if (document.querySelector('#random-right-click').checked) {
            if (!(Number(document.querySelector('#right-click-interval-from').value) > 0)) {
                document.querySelector('#right-click-interval-from').classList.add('is-invalid');
                return;
            } else {
                document.querySelector('#right-click-interval-from').classList.remove('is-invalid');
            }
            if (!(Number(document.querySelector('#right-click-interval-to').value) > 0) && (Number(document.querySelector('#right-click-interval-to').value) > (Number(document.querySelector('#right-click-interval-from').value)))) {
                document.querySelector('#right-click-interval-to').classList.add('is-invalid');
                return;
            } else {
                document.querySelector('#right-click-interval-to').classList.remove('is-invalid');
            }

            if ((Number(document.querySelector('#right-click-interval-from').value) > 0) && (Number(document.querySelector('#right-click-interval-to').value) > 0)) {
                (function setAlarm() {
                    if (!status) {
                        return;
                    }
                    let interval = Math.random() * (Number(document.querySelector('#right-click-interval-to').value) - Number(document.querySelector('#right-click-interval-from').value)) + Number(document.querySelector('#right-click-interval-from').value);
                    robot.mouseClick('right');
                    setTimeout(setAlarm, interval);
                })();
            }
        }
    }


    if (document.querySelector('#left-click-enable').checked) {
        if (!document.querySelector('#random-left-click').checked) {
            if (!(Number(document.querySelector('#left-click-interval').value) > 0)) {
                document.querySelector('#left-click-interval').classList.add('is-invalid');
                return;
            } else {
                document.querySelector('#left-click-interval').classList.remove('is-invalid');
                (function ss() {
                    if (!status || !document.querySelector('#left-click-enable').checked) {
                        return;
                    }
                    let interval = Number(document.querySelector('#left-click-interval').value);
                    robot.mouseClick('left');
                    setTimeout(ss, interval);;
                })();
            }
        }

        if (document.querySelector('#random-left-click').checked) {
            if (!(Number(document.querySelector('#left-click-interval-from').value) > 0)) {
                document.querySelector('#left-click-interval-from').classList.add('is-invalid');
                return;
            } else {
                document.querySelector('#left-click-interval-from').classList.remove('is-invalid');
            }
            if (!(Number(document.querySelector('#left-click-interval-to').value) > 0) && (Number(document.querySelector('#left-click-interval-to').value) > (Number(document.querySelector('#left-click-interval-from').value)))) {
                document.querySelector('#left-click-interval-to').classList.add('is-invalid');
                return;
            } else {
                document.querySelector('#left-click-interval-to').classList.remove('is-invalid');
            }

            if ((Number(document.querySelector('#left-click-interval-from').value) > 0) && (Number(document.querySelector('#left-click-interval-to').value) > 0)) {
                (function setAlarm() {
                    if (!status) {
                        return;
                    }
                    let interval = Math.random() * (Number(document.querySelector('#left-click-interval-to').value) - Number(document.querySelector('#left-click-interval-from').value)) + Number(document.querySelector('#left-click-interval-from').value);
                    robot.mouseClick('left');
                    setTimeout(setAlarm, interval);
                })();
            }
        }
    }
});

for (let element of document.getElementsByClassName('randomize')) {
    element.addEventListener('change', (event) => {
        event.target.parentElement.parentElement.querySelector('.single-value-field').classList.toggle('hidden');
        event.target.parentElement.parentElement.querySelector('.two-values-field').classList.toggle('hidden');
    });
}

function flushTimeOuts() {
    var id = setTimeout(function() {}, 0);
    while (id--) {
        clearTimeout(id); // will do nothing if no timeout with id is present
    }
}