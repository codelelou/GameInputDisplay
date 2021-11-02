/**
 * Axis Class
 * 
 * @class
 */
 class Axis {

    /** @type {number} */
    static DEFAULT_THRESHOLD = 0.6;

    /** @type {string} */
    static VALUE_LEFT = "Left";

    /** @type {string} */
    static VALUE_RIGHT = "Right";

    /** @type {string} */
    static VALUE_UP = "Up";

    /** @type {string} */
    static VALUE_DOWN = "Down";

    /** @type {string} */
    static POSITION_BUTTON = "B";

    /** @type {string} */
    static POSITION_COMMAND = "C";

    /** @type {string} */
    static POSITION_LEFT = "L";

    /** @type {string} */
    static POSITION_RIGHT = "R";

    /**
     * Factory by axes(X-axis and Y-axis)
     * 
     * @param {string} position
     * @param {number} xAxis
     * @param {number} yAxis
     * @param {number} [threshold]
     * @returns {Axis}
     */
    static factoryByAxes = (position, xAxis, yAxis, threshold = Axis.DEFAULT_THRESHOLD) => {
        const getValue = (axis, valueA, valueB) => {
            let res = [];
            if ((threshold * -1) > axis) {
                res.push(valueA);
            } else if (threshold < axis) {
                res.push(valueB);
            }
            return res;
        }
        return new Axis(position, getValue(xAxis, Axis.VALUE_LEFT, Axis.VALUE_RIGHT), getValue(yAxis, Axis.VALUE_UP, Axis.VALUE_DOWN));
    }

    /**
     * @param {string} position
     * @param {string[]} [xAxis]
     * @param {string[]} [yAxis]
     * @param {boolead} [hold]
     */
    constructor(position, xAxis = [], yAxis = [], hold = false) {

        /** @type {string} */
        this._position = position;

        /** @type {string[]} */
        this._xAxis = xAxis;

        /** @type {string[]} */
        this._yAxis = yAxis;

        /** @type {boolean} */
        this._hold = hold;
    }

    /**
     * Hold
     * 
     * @param {boolean} [hold]
     * @returns {boolean}
     */
    hold = (hold) => {
        if ((true === hold) || (false === hold)) {
            return (this._hold = hold);
        }
        return this._hold;
    }

    /**
     * Not entered
     * 
     * @returns {boolean}
     */
    notEntered = () => {
        return !this._xAxis.length && !this._yAxis.length;
    }

    /**
     * Position
     * 
     * @returns {string}
     */
    position = () => {
        return this._position;
    }

    /**
     * Values
     * 
     * @returns {string[]}
     */
    values = () => {
        return [...this.xAxis(), ...this.yAxis()];
    }

    /**
     * X-Axis
     * 
     * @param {string[]} [axis]
     * @returns {string[]}
     */
    xAxis = (axis) => {
        if (axis) {
            return (this._xAxis = axis);
        }
        return this._xAxis;
    }

    /**
     * Y-Axis
     * 
     * @param {string[]} [axis]
     * @returns {string[]}
     */
    yAxis = (axis) => {
        if (axis) {
            return (this._yAxis = axis);
        }
        return this._yAxis;
    }
}

/**
 * Button Class
 * 
 * @class
 */
class Button {

    /**
     * Constructor
     * 
     * @param {array} button
     * @param {number} index
     * @param {boolean} [hold]
     */
    constructor(button, index, hold = false) {

        /** @type {number} */
        this._index = index;

        /** @type {boolean} */
        this._button = button;

        /** @type {boolean} */
        this._hold = hold;
    }

    /**
     * Hold
     * 
     * @param {boolean} [hold]
     * @returns {boolean}
     */
    hold = (hold) => {
        if ((true === hold) || (false === hold)) {
            return (this._hold = hold);
        }
        return this._hold;
    }

    /**
     * Index
     * 
     * @returns {number}
     */
    index = () => {
        return this._index;
    }

    /**
     * Pressed
     * 
     * @returns {boolean}
     */
    pressed = () => {
        return this._rawButton().pressed;
    }

    /**
     * Touched
     * 
     * @returns {boolean}
     */
    touched = () => {
        return this._rawButton().touched;
    }

    /**
     * Value
     * 
     * @returns {number}
     */
    value = () => {
        return this._rawButton().value;
    }

    /**
     * Raw button
     * 
     * @returns {object}
     */
    _rawButton = () => {
        if (!this._button) {
            return {
                pressed: false,
                touched: false,
                value: 0
            }
        }
        return this._button;
    }

}


/**
 * Buttons Class
 * 
 * @class
 */
 class Buttons {

    /**
     * @param {array} buttons
     * @returns {Buttons}
     */
    static factory = (buttons) => {
        let buttonArray = [];
        let buttonIndexes = [];
        let directional = new Axis(Axis.POSITION_BUTTON);
        for (let i = 0; i < buttons.length; i++) {
            if (!parameterSetting.excludeButtons().includes(String(i)) && buttons[i].pressed) {
                let buttonIndexConverts = parameterSetting.buttonIndexConverts();
                buttonIndexes = [];
                if (buttonIndexConverts.has(i)) {
                    buttonIndexes = buttonIndexConverts.get(i);
                } else {
                    buttonIndexes = [i];
                }
                buttonIndexes.forEach(buttonIndex => {
                    let directionalButtons = parameterSetting.directionalButtons();
                    buttonArray.push(new Button(buttons[i], buttonIndex));
                    if (directionalButtons.up.includes(buttonIndex)) {
                        directional.yAxis().push(Axis.VALUE_UP);
                    }
                    if (directionalButtons.down.includes(buttonIndex)) {
                        directional.yAxis().push(Axis.VALUE_DOWN);
                    }
                    if (directionalButtons.left.includes(buttonIndex)) {
                        directional.xAxis().push(Axis.VALUE_LEFT);
                    }
                    if (directionalButtons.right.includes(buttonIndex)) {
                        directional.xAxis().push(Axis.VALUE_RIGHT);
                    }
                });
            }
        }
        return new Buttons(buttonArray, directional);
    }

    /**
     * @param {Button[]} [buttons]
     * @param {Axis} [directional]
     */
    constructor(buttons, directional) {

        /** @type {Button[]} */
        this._buttons = buttons;

        /** @type {Axis} */
        this._directional = directional;
    }

    /**
     * Count
     * 
     * @returns {number}
     */
    count = () => {
        return this.getAll().length;
    }

    /**
     * Directional
     * 
     * @param {Axis} [directional]
     * @returns {Axis}
     */
    directional = (directional) => {
        if (directional) {
            return (this._directional = directional);
        }
        return this._directional;
    }

    /**
     * Find by button index
     * 
     * @param {number} index
     * @returns {Button[]}
     */
    find = (index = -1) => {
        let res = [];
        if (0 <= index) {
            this.getAll().forEach(button => {
                if (index === button.index()) {
                    res.push(button);
                }
            });
        }
        return res;
    }

    /**
     * Get the all
     * 
     * @returns {Button[]}
     */
    getAll = () => {
        return this._buttons;
    }

    /**
     * Not entered
     * 
     * @returns {boolean}
     */
    notEntered = () => {
        for (const button of this.getAll()) {
            if (button.pressed()) {
                return false;
            }
        }
        return true;
    }

}

/**
 * Axis: 10: Up and Left
 * 
 * @type {number}
 */
const AXIS_10_UP_LEFT = 1;

/**
 * Axis: 10: Left
 * 
 * @type {number}
 */
const AXIS_10_LEFT = 0.7142857313156128;

/**
 * Axis: 10: Down and Left
 * 
 * @type {number}
 */
const AXIS_10_DOWN_LEFT = 0.4285714626312256;

/**
 * Axis: 10: Down
 * 
 * @type {number}
 */
const AXIS_10_DOWN = 0.14285719394683838;

/**
 * Axis: 10: Down and Right
 * 
 * @type {number}
 */
const AXIS_10_DOWN_RIGHT = -0.1428571343421936;

/**
 * Axis: 10: Right
 * 
 * @type {number}
 */
const AXIS_10_RIGHT = -0.4285714030265808;

/**
 * Axis: 10: Up and Right
 * 
 * @type {number}
 */
const AXIS_10_UP_RIGHT = -0.7142857313156128;

/**
 * Axis: 10: Up
 * 
 * @type {number}
 */
const AXIS_10_UP = -1;

/**
 * Gamepad Class
 * 
 * @class
 */
class Gamepad {

    /**
     * Get the Game Pads
     * 
     * @returns {array}
     */
    static getGamePads = () => {
        return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    }

    /**
     * @param {array} gamepad
     * @param {number} index Controller Index
     * @param {Gamepad} [beforeGamepad]
     * @returns {Gamepad}
     */
    static factory = (gamepad, index, beforeGamepad) => {

        /**
         * @param {Gamepad} gamepad
         * @returns {Axis} Merged Axis
         */
        const mergeAxis = (gamepad) => {
            let mergeAxis = new Axis(Axis.POSITION_COMMAND);
            [gamepad.buttons().directional(), gamepad.leftAxis()].forEach(command => {
                command.xAxis().forEach(val => {
                    if (!mergeAxis.xAxis().includes(val)) {
                        mergeAxis.xAxis().push(val);
                    }
                });
                command.yAxis().forEach(val => {
                    if (!mergeAxis.yAxis().includes(val)) {
                        mergeAxis.yAxis().push(val);
                    }
                });
            });
            return mergeAxis;
        }

        /** @type {Gamepad} */
        let newGamepad;

        /** @type {Buttons} */
        let buttons;

        /** @type {Axis} */
        let leftAxis;

        /** @type {Axis} */
        let rightAxis;

        /** @type {Axis} */
        let newCommandAxis;

        /** @type {Axis} */
        let directional;

        if (gamepad && gamepad.connected) {
            buttons = Buttons.factory(gamepad.buttons);
            if (gamepad.axes) {
                switch (gamepad.axes.length) {
                    case 4:
                        leftAxis = Axis.factoryByAxes(Axis.POSITION_LEFT, gamepad.axes[0], gamepad.axes[1]);
                        rightAxis = Axis.factoryByAxes(Axis.POSITION_RIGHT, gamepad.axes[2], gamepad.axes[3]);
                        break;
                    case 10:
                        let directional = buttons.directional();
                        switch (gamepad.axes[9]) {
                            case AXIS_10_UP:
                                directional.yAxis().push(Axis.VALUE_UP);
                                break;
                            case AXIS_10_UP_LEFT:
                                directional.yAxis().push(Axis.VALUE_UP);
                                directional.xAxis().push(Axis.VALUE_LEFT);
                                break;
                            case AXIS_10_UP_RIGHT:
                                directional.yAxis().push(Axis.VALUE_UP);
                                directional.xAxis().push(Axis.VALUE_RIGHT);
                                break;
                            case AXIS_10_DOWN:
                                directional.yAxis().push(Axis.VALUE_DOWN);
                                break;
                            case AXIS_10_DOWN_LEFT:
                                directional.yAxis().push(Axis.VALUE_DOWN);
                                directional.xAxis().push(Axis.VALUE_LEFT);
                                break;
                            case AXIS_10_DOWN_RIGHT:
                                directional.yAxis().push(Axis.VALUE_DOWN);
                                directional.xAxis().push(Axis.VALUE_RIGHT);
                                break;
                            case AXIS_10_LEFT:
                                directional.xAxis().push(Axis.VALUE_LEFT);
                                break;
                            case AXIS_10_RIGHT:
                                directional.xAxis().push(Axis.VALUE_RIGHT);
                                break;
                        }
                    case 9:
                        leftAxis = Axis.factoryByAxes(Axis.POSITION_LEFT, gamepad.axes[0], gamepad.axes[1]);
                        rightAxis = Axis.factoryByAxes(Axis.POSITION_RIGHT, gamepad.axes[2], gamepad.axes[5]);
                    default:
                        break;
                }
            } else {
            leftAxis = new Axis();
            rightAxis = new Axis(); 
            }
        } else {
            buttons = new Buttons();
            leftAxis = new Axis();
            rightAxis = new Axis(); 
        }
        newGamepad = new Gamepad(buttons, leftAxis, rightAxis, index, gamepad.timestamp);
        newCommandAxis = mergeAxis(newGamepad);
        newGamepad.commands(newCommandAxis);
        if (beforeGamepad && (index == beforeGamepad.index())) {
            /**
             * @param {Axis} newAxis
             * @param {Axis} beforeAxis
             * @param {boolean} hold
             * @returns {void}
             */
            const updateAxisHold = (newAxis, beforeAxis, hold) => {
                if ((newAxis.xAxis().length || newAxis.yAxis().length)
                        && (newAxis.xAxis().join("-") == beforeAxis.xAxis().join("-"))
                        && (newAxis.yAxis().join("-") == beforeAxis.yAxis().join("-"))) {
                    hold = (hold || beforeAxis.hold());
                    // hold = true;
                } else {
                    hold = false;
                }
                newAxis.hold(hold);
            }
            let hold = 1 < newGamepad.timestamp() - beforeGamepad.timestamp();  // TODO Hold Check
            if (beforeGamepad.commands()) {
                updateAxisHold(newCommandAxis, beforeGamepad.commands(), hold);
                newGamepad.buttons().directional().hold(newCommandAxis.hold());
                newGamepad.leftAxis().hold(newCommandAxis.hold());
            }
            // updateAxisHold(newGamepad.leftAxis(), beforeGamepad.leftAxis(), hold);
            updateAxisHold(newGamepad.rightAxis(), beforeGamepad.rightAxis(), hold);
            newGamepad.buttons().getAll().forEach(button => {
                if (button.pressed()) {
                    beforeGamepad.buttons().getAll().forEach(btn => {
                        if ((button.index() == btn.index()) && btn.pressed()) {
                            button.hold(hold || btn.hold());
                        }
                    });
                }
            });
        }
        return newGamepad;
    }

    /**
     * @param {Buttons} buttons
     * @param {Axis} leftAxis
     * @param {Axis} rightAxis
     * @param {number} [index]
     * @param {number} [timestamp]
     */
    constructor(buttons, leftAxis, rightAxis, index, timestamp) {
        
        /** @type {Buttons} */
        this._buttons = buttons;

        /** @type {Axis} */
        this._commands;

        /** @type {Axis} */
        this._leftAxis = leftAxis;

        /** @type {Axis} */
        this._rightAxis = rightAxis;

        /** @type {number} */
        this._index = index;

        /** @type {number} */
        this._timestamp = timestamp;
    }

    /**
     * Buttons
     * 
     * @returns {Buttons}
     */
    buttons = () => {
        return this._buttons;
    }

    /**
     * Commands
     * 
     * @param {Axis} [commands]
     * @returns {Axis}
     */
    commands = (commands) => {
        if (commands) {
            return (this._commands = commands);
        }
        return this._commands;
    }

    /**
     * Index
     * 
     * @returns {number}
     */
    index = () => {
        return this._index;
    }

    /**
     * Left Axis
     * 
     * @returns {Axis}
     */
    leftAxis = () => {
        return this._leftAxis;
    }

    /**
     * Not entered
     * 
     * @returns {boolean}
     */
    notEntered = () => {
        return this.buttons().notEntered()
                && this.buttons().directional().notEntered()
                && this.leftAxis().notEntered()
                && this.rightAxis().notEntered();
    }

    /**
     * Right Axis
     * 
     * @returns {Axis}
     */
    rightAxis = () => {
        return this._rightAxis;
    }

    /**
     * Timestamp
     * 
     * @returns {number}
     */
    timestamp = () => {
        return this._timestamp;
    }
}
