import { Door0, Door1, Door2, Box } from './doorOthers';

/**
 * @class App
 * @param {Element} el
 */
export function App(el) {
    var appEl = el,
        doors = [
            new Door0(0, onUnlock),
            new Door1(1, onUnlock),
            new Door2(2, onUnlock),
            new Box(3, onUnlock)
        ];

    this.doors = doors;

    /**
     * Callback вызывается в коде двери
     * Тут даем возможность открыть следующие двери
     */
    function onUnlock() {
        var previousUnlocked;

        // Даем открыть следующую дверь
        for (var i = 0; i < doors.length; i++) {
            if (!doors[i].isLocked) {
                previousUnlocked = true;
            } else {
                if (previousUnlocked && doors[i].isLocked) {
                    doors[i].enable();
                    break;
                }
            }
        }
    };
}
