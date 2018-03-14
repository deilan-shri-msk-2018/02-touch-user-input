import {
  DoorBase
} from './doorBase';

// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export function Door0(number, onUnlock) {
  DoorBase.apply(this, arguments);

  var buttons = [
    this.popup.querySelector('.door-riddle__button_0'),
    this.popup.querySelector('.door-riddle__button_1'),
    this.popup.querySelector('.door-riddle__button_2')
  ];

  buttons.forEach(function (b) {
    b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
  }.bind(this));

  function _onButtonPointerDown(e) {
    e.target.classList.add('door-riddle__button_pressed');
    checkCondition.apply(this);
  }

  function _onButtonPointerUp(e) {
    e.target.classList.remove('door-riddle__button_pressed');
  }

  /**
   * Проверяем, можно ли теперь открыть дверь
   */
  function checkCondition() {
    var isOpened = true;
    buttons.forEach(function (b) {
      if (!b.classList.contains('door-riddle__button_pressed')) {
        isOpened = false;
      }
    });

    // Если все три кнопки зажаты одновременно, то откроем эту дверь
    if (isOpened) {
      this.unlock();
    }
  }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export function Door1(number, onUnlock) {
  DoorBase.apply(this, arguments);

  // ==== Напишите свой код для открытия второй двери здесь ====
  var doorRiddle = this.popup.querySelector('.door-riddle');

  var buttons = Array.from(doorRiddle.querySelectorAll('.door-riddle__button'))
    .sort(function (a, b) {
      return getButtonNumber(a) - getButtonNumber(b);
    });

  if (buttons[0]) {
    buttons[0].addEventListener('pointerdown', onPointerDown);
  }

  function onPointerDown(e) {
    var currentButton = e.target;
    currentButton.removeEventListener('pointerdown', onPointerDown);
    press(currentButton);
    setup(currentButton);
    doorRiddle.addEventListener('pointerup', onPointerUp);
    doorRiddle.addEventListener('pointercancel', onPointerUp);
    doorRiddle.addEventListener('pointerleave', onPointerUp);
  };

  function onPointerCorrectMove(e) {
    var currentButton = e.target;
    currentButton.removeEventListener('pointermove', onPointerCorrectMove);
    press(currentButton);
    setup(currentButton);
  };

  function onPointerIncorrectMove(e) {
    reset();
  };

  var onPointerUp = function (e) {
    var isOpened = checkCondition.apply(this);
    if (isOpened) {
      this.unlock();
    } else {
      reset();
    }
    doorRiddle.removeEventListener('pointerup', onPointerUp);
    doorRiddle.removeEventListener('pointercancel', onPointerUp);
    doorRiddle.removeEventListener('pointerleave', onPointerUp);
  }.bind(this);

  function setup(currentButton) {
    var buttonNumber = getButtonNumber(currentButton);
    var nextButton = buttons.find(function (button) {
      return button.classList.contains('door-riddle__button_' + (buttonNumber + 1));
    });
    if (nextButton) {
      nextButton.removeEventListener('pointermove', onPointerIncorrectMove)
      nextButton.addEventListener('pointermove', onPointerCorrectMove);
    }
    var restButtons = buttons.filter(function (button) {
      return button !== nextButton &&
        !button.classList.contains('door-riddle__button_pressed');
    });
    restButtons.forEach(function (button) {
      button.addEventListener('pointermove', onPointerIncorrectMove);
    });
  }

  function reset() {
    buttons.forEach(function (button) {
      release(button);
      button.removeEventListener('pointermove', onPointerIncorrectMove);
      button.removeEventListener('pointermove', onPointerCorrectMove);
    });
    buttons[0].addEventListener('pointerdown', onPointerDown);
  }

  function press(buttonEl) {
    buttonEl.classList.add('door-riddle__button_pressed');
  }

  function release(buttonEl) {
    buttonEl.classList.remove('door-riddle__button_pressed');
  }

  function getButtonNumber(buttonEl) {
    var className = buttonEl.className.split(' ').find(function (className) {
      return className.startsWith('door-riddle__button_');
    });
    if (className) {
      var number = className.substring('door-riddle__button_'.length);
      return parseInt(number, 10);
    }
  }

  /**
   * Проверяем, можно ли теперь открыть дверь
   */
  function checkCondition() {
    var isOpened = true;
    buttons.forEach(function (b) {
      if (!b.classList.contains('door-riddle__button_pressed')) {
        isOpened = false;
      }
    });
    return isOpened;
  }
  // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export function Door2(number, onUnlock) {
  DoorBase.apply(this, arguments);

  // ==== Напишите свой код для открытия третей двери здесь ====
  // Для примера дверь откроется просто по клику на неё
  this.popup.addEventListener('click', function () {
    this.unlock();
  }.bind(this));
  // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export function Box(number, onUnlock) {
  DoorBase.apply(this, arguments);

  // ==== Напишите свой код для открытия сундука здесь ====
  // Для примера сундук откроется просто по клику на него
  this.popup.addEventListener('click', function () {
    this.unlock();
  }.bind(this));
  // ==== END Напишите свой код для открытия сундука здесь ====

  this.showCongratulations = function () {
    alert('Поздравляю! Игра пройдена!');
  };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;