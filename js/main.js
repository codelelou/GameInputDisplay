/**
 * Modes: Controller
 * 
 * @type {string}
 */
const MODES_CONTROLLER = "Controller";

/**
 * Modes: Debug
 * 
 * @type {string}
 */
const MODES_DEBUG = "Debug";

/**
 * Modes: Key log
 * 
 * @type {string}
 */
const MODES_KEYLOG = "KeyLog";

/**
 * Modes: Deck
 * 
 * @type {string}
 */
const MODES_DECK = "Deck";

/** @type {string} */
const ID_CONTAINER = "GameInputDisplay";

/** @type {string} */
const ID_DEBUG = "GIDDebug";

/** @type {string} */
const ID_GAMECONTROLLER = "GIDGameController";

/** @type {string} */
const ID_KEYLOG = "GIDKeyLog";

/** @type {string} */
const ID_Settings = "GIDSettings";

/**
 * Directional buttons hash
 * 
 * @typeof {DirectionalButtonsHash}
 * @type {object}
 * @property {number[]} up
 * @property {number[]} down
 * @property {number[]} left
 * @property {number[]} right
 */

/**
 * Parameter setting class
 * 
 * @class
 */
class ParameterSetting {

    /**
     * Default: COntroller index
     * 
     * @type {number}
     */
    static DEFAULT_CONTROLLER_INDEX = 0;

    /**
     * Default: Delay (Millisecond)
     * 
     * @type {number}
     */
    static DEFAULT_DELAY = 8;

    /**
     * Default: Directional buttons
     * 
     * @type {DirectionalButtonsHash} 
     */
    static DEFAULT_DIRECTIONAL_BUTTONS = {
        up: [12],
        down: [13],
        left: [14],
        right: [15]
    };

    /**
     * Default: Items
     * 
     * @type {number}
     */
    static DEFAULT_KEY_LOG_ITEMS = 40;

    /**
     * Default: Log limit
     * 
     * @type {number}
     */
    static DEFAULT_LOG_LIMIT = 30;

    /**
     * Default: Modes
     * 
     * @type {string[]}
     */
    static DEFAULT_MODES = `${MODES_CONTROLLER},${MODES_KEYLOG}`;

    /**
     * Default: Styles
     * 
     * @type {string}
     */
    static DEFAULT_STYLES = "ProPad,KeyLog_ButtonSymbol_PS_DualShock";

    /**
     * Get parameter key: Button index converts
     * 
     * @type {string}
     */
    static KEY_BUTTON_INDEX_CONVERTS = "converts";

    /**
     * Get parameter key: Controller index
     * 
     * @type {string}
     */
    static KEY_CONTROLLER_INDEX = "controller";

    /**
     * Get parameter key: Deck
     * 
     * @type {string}
     */
    static KEY_DECK = "deck";

    /**
     * Get parameter key: Directional button indexes
     * 
     * @type {string}
     */
    static KEY_DIRECTIONAL_BUTTON_INDEXES = "directionals";

    /**
     * Get parameter key: Exclude button indexs
     * 
     * @type {string}
     * @description Comma Separated Value
     * @example index.html?excludes=8,9
     */
    static KEY_EXCLUDE_BUTTONS = "excludes";

    /**
     * Get parameter key: Input delay
     * 
     * @type {string}
     * @description Millisecond
     * @example index.html?delay=4
     */
    static KEY_INPUT_DELAY = "delay";

    /**
     * Get parameter key: Items
     * 
     * @type {string}
     */
    static KEY_KEY_LOG_ITEMS = "items";

    /**
     * Get parameter key: Log limit
     * 
     * @type {string}
     * @description Log limit is Key log lines
     * @example index.html?log=15
     */
    static KEY_LOG_LIMIT = "log";

    /**
     * Get parameter key: Models
     * 
     * @type {string}
     * @example index.html?modes=Debug
     */
    static KEY_MODES = "modes";

    /**
     * Get parameter key: Styles
     * 
     * @type {string}
     * @description Comma Separated Value
     * @example index.html?styles=SkinSakura,SkinChoco,Skin7
     */
    static KEY_STYLES = "styles";

    /**
     * Get parameter value: Deck: Clear
     * 
     * @type {string}
     */
    static VALUE_DECK_CLEAR = "Clear";

    /**
     * Get parameter value: Deck: Reset
     * 
     * @type {string}
     */
    static VALUE_DECK_RESET = "Reset";

    /**
     * @returns {ParameterSetting}
     */
    static factory = () => {
        return new ParameterSetting();
    }

    constructor()  {

        /** @type {URLSearchParams} */
        this._searchParams = (new URL(window.location.href)).searchParams;

        this.updateParams();
    }

    /**
     * Button index converts
     * 
     * @returns {Map}
     */
    buttonIndexConverts = () => {
        return this._buttonIndexConverts;
    }

    /**
     * Check the modes
     * 
     * @param {(string|string[])} modes
     * @returns {boolean}
     */
    checkModes = (modes) => {
        let res = false;
        if (!Array.isArray(modes)) {
            return this.checkModes([modes]);
        } else {
            let ms = this.modes();
            for (let mode of modes) {
                if (!res && ms.includes(mode)) {
                    res = true;
                    break;
                }
            }
        }
        return res;
    }

    /**
     * Controller index
     * 
     * @returns {number}
     */
    controllerIndex = () => {
        return this._controllerIndex;
    }

    /**
     * Deck
     * 
     * @returns {Deck}
     */
    deck = () => {
        return this._deck;
    }

    /**
     * Delay
     * 
     * @returns {number}
     */
    delay = () => {
        return this._delay;
    }

    /**
     * Directional buttons
     * 
     * @param {DirectionalButtonsHash} [directionalButtons]
     * @returns {DirectionalButtonsHash}
     */
    directionalButtons = (directionalButtons) => {
        if (directionalButtons) {
            return (this._directionalButtons = directionalButtons);
        }
        return this._directionalButtons;
    }

    /**
     * Exclude buttons
     * 
     * @returns {number[]}
     */
    excludeButtons = () => {
        return this._excludeButtons;
    }

    /**
     * Find
     * 
     * @param {string} key
     * @param {string} [defaultValue = ""]
     * @returns {string}
     */
    find = (key, defaultValue = "") => {
        let res = this.searchParams().get(key);
        if ((undefined === res) || (null === res)) {
            return defaultValue;
        }
        return res;
    }

    /**
     * Key log items
     * 
     * @returns {number}
     */
    keyLogItems = () => {
        return this._keyLogItems;
    }

    /**
     * Log limit
     * 
     * @returns {number}
     */
    logLimit = () => {
        return this._logLimit;
    }

    /**
     * Modes
     * 
     * @returns {string[]}
     */
    modes = () => {
        return this._modes;
    }

    /**
     * Search params
     * 
     * @returns {URLSearchParams}
     */
    searchParams = () => {
        return this._searchParams;
    }

    /**
     * Styles
     * 
     * @returns {string}
     */
    styles = () => {
        return this._styles;
    }

    /**
     * Update the parameters
     * 
     * @returns {void}
     */
    updateParams = () => {

        let buttonIndexConverts = new Map();
        let directionalButtons = ParameterSetting.DEFAULT_DIRECTIONAL_BUTTONS;
        let biConverts = this.find(ParameterSetting.KEY_BUTTON_INDEX_CONVERTS);
        let dButtons = this.find(ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES);

        if ("" != biConverts) {
            let convert = [];
            let convertFrom;
            let convertTo;
            let regexp = /\d+/igu;
            biConverts.split(",").forEach(cnvt => {
                convert = cnvt.match(regexp);
                if (2 == convert.length) {
                    convertFrom = parseInt(convert[0]);
                    convertTo = parseInt(convert[1]);
                    if (!buttonIndexConverts.has(convertFrom)) {
                        buttonIndexConverts.set(convertFrom, [convertTo]);
                    } else {
                        buttonIndexConverts.get(convertFrom).push(convertTo);
                    }
                }
            });
        }

        if (dButtons && (4 == dButtons.split("-").length)) {
            let dpi = [];
            dButtons.split("-").forEach((dpIndexes, index) => {
                dpi[index] = [];
                dpIndexes.split(",").forEach(dpIndex => {
                    dpi[index].push(Number.parseInt(dpIndex));
                });
            });
            directionalButtons = {
                up: dpi[0],
                down: dpi[1],
                left: dpi[2],
                right: dpi[3]
            }
        }

        let deck = new Deck();
        let deckSetting = this.find(ParameterSetting.KEY_DECK);
        if ("" != deckSetting) {
            let setting = {};
            let index;
            let value;
            deckSetting.split(",").forEach(item => {
                index = Number(item.replace(/\-.+$/i, ""));
                value = item.replace(/^\d+\-/i, "");
                if (0 <= index) {
                    if (!setting[value]) {
                        setting[value] = [index];
                    } else {
                        setting[value].push(index);
                    }
                }
            });
            for (const key in setting) {
                switch (key) {
                    case ParameterSetting.VALUE_DECK_CLEAR:
                        deck.clearIndexes(setting[key]);
                        break;
                    case ParameterSetting.VALUE_DECK_RESET:
                        deck.resetIndexes(setting[key]);
                        break;
                    default:
                        // if (DeckContainer_Abstract.TYPE_OTHER != DeckItem.getType(key)) {
                            deck.add(new DeckItem(setting[key], key));
                        // }
                        break;
                }
            }
        }

        /**
         * Button index converts
         * 
         * @type {Map}
         */
        this._buttonIndexConverts = buttonIndexConverts;

        /**
         * Controller index
         * 
         * @type {number}
         */
        this._controllerIndex = this.find(ParameterSetting.KEY_CONTROLLER_INDEX, ParameterSetting.DEFAULT_CONTROLLER_INDEX);

        /**
         * Deck
         * 
         * @type {Deck}
         */
        this._deck = deck;

        /**
         * Delay
         * 
         * @type {number}
         */
        this._delay = this.find(ParameterSetting.KEY_INPUT_DELAY, ParameterSetting.DEFAULT_DELAY);

        /**
         * Directiona buttons
         * 
         * @type {DirectionalButtonsHash}
         */
        this._directionalButtons = directionalButtons;

        /**
         * Exclude buttons
         * 
         * @types {number[]}
         */
        this._excludeButtons = this.find(ParameterSetting.KEY_EXCLUDE_BUTTONS).split(",");

        /**
         * Key log items
         * 
         * @type {number}
         */
        this._keyLogItems = this.find(ParameterSetting.KEY_KEY_LOG_ITEMS, ParameterSetting.DEFAULT_KEY_LOG_ITEMS);

        /**
         * Log limit
         * 
         * @type {number}
         */
        this._logLimit = this.find(ParameterSetting.KEY_LOG_LIMIT, ParameterSetting.DEFAULT_LOG_LIMIT);

        /**
         * Modes
         * 
         * @type {string[]}
         */
        this._modes = this.find(ParameterSetting.KEY_MODES, ParameterSetting.DEFAULT_MODES).split(",");

        /**
         * Styles
         * 
         * @type {string}
         */
        this._styles = this.find(ParameterSetting.KEY_STYLES, ParameterSetting.DEFAULT_STYLES).split(",").join(" ");
    }
}

/** @type {HTMLElement} */
let controllerContainer = document.getElementById(ID_GAMECONTROLLER);

/** @type {HTMLElement} */
let debugContainer = document.querySelectorAll(`#${ID_DEBUG} > .controllers > dl`);

/** @type {HTMLElement} */
let keyLogContainer = document.getElementById(ID_KEYLOG);

/** @type {HTMLElement} */
let keyLogTemplate = document.createElement("ul");

/**
 * Latest gamepad
 * 
 * @type {Gamepad}
 */
let latestGamepad;

/** @type {string} */
let latestLog;

/** @type {string[]} */
let logs = [];

/** @type {number} */
let timestamp = Date.now();

/**
 * Parameter settings
 * 
 * @type {ParameterSetting}
 */
let parameterSetting = ParameterSetting.factory();

// /**
//  * Deck
//  * 
//  * @type {Deck}
//  */
// let deck = new Deck();

/**
 * Format the Button Input CSS Class
 * 
 * @param {Button} button
 * @returns {string[]}
 */
const formatButtonInputClassName = (button) => {
    return [`Button_${button.index()}`,
            `Button_${button.hold() ? "Hold" : "Press"}_${button.index()}`,
            `Button_Value_${Math.floor(button.value() * 10) * 10}_${button.index()}`];
}

/**
 * Format the Axis Input CSS Class
 * 
 * @param {Axis} axis
 * @returns {string[]}
 */
const formatAxisInputClassNames = (axis) => {
    const format = (position, value, hold) => {
        return [`Stick${position}_${value}`, `Stick${position}_${hold ? "Hold" : "Press"}_${value}`];
    }
    let classNames = [];
    if (!axis.notEntered()) {
        axis.xAxis().forEach(axisVal => {
            classNames = classNames.concat(format(axis.position(), axisVal, axis.hold()));
        });
        axis.yAxis().forEach(axisVal => {
            classNames = classNames.concat(format(axis.position(), axisVal, axis.hold()));
        });
    }
    return classNames;
}

/**
 * Update the debug
 * 
 * @param {array} gamepads by GamepadAPI
 * @returns {void}
 */
const updateDebug = (gamepads) => {
    if (parameterSetting.checkModes(MODES_DEBUG)) {
        let gamepad;
        let bodyContainers;
        let liContainer;
        let olElement = document.createElement("ol");
        let liElement = document.createElement("li");
        let axesContainer = olElement.cloneNode(false);
        let buttonsContainer = olElement.cloneNode(false);
        let button;
        let newTimestamp = Date.now();
        document.getElementById(ID_DEBUG).dataset.lag = (newTimestamp - timestamp);
        timestamp = newTimestamp;
        for (let i = 0; (i < 4) && i < gamepads.length; i++) {
            gamepad = gamepads[i];
            bodyContainers = debugContainer.item(i);
            if (gamepad) {
                axesContainer.innerHTML = "";
                buttonsContainer.innerHTML = "";
                for (let j = 0; j < gamepad.axes.length; j++) {
                    liContainer = liElement.cloneNode(false);
                    liContainer.innerText = gamepad.axes[j];
                    axesContainer.appendChild(liContainer);
                }
                for (let j = 0; j < gamepad.buttons.length; j++) {
                    liContainer = liElement.cloneNode(false);
                    button = gamepad.buttons[j];
                    liContainer.dataset.pressed = button.pressed;
                    liContainer.dataset.touched = button.touched;
                    liContainer.dataset.value = button.value;
                    liContainer.innerText = button.value;
                    buttonsContainer.appendChild(liContainer);
                }
                bodyContainers.dataset.connected = gamepad.connected;
                [{key: "dd.id", value: gamepad.id},
                        {key: "dd.index", value: gamepad.index},
                        {key: "dd.connected", value: (gamepad.connected ? "Yes" : "No")},
                        {key: "dd.mapping", value: gamepad.mapping},
                        {key: "dd.timestamp", value: gamepad.timestamp}].forEach(mapping => {
                    [bodyContainers.querySelector(mapping.key)].forEach(ele => {
                        if (ele.innerText !== mapping.value) {
                            ele.innerText = mapping.value;
                        }
                    });
                });
                bodyContainers.querySelector("dd.axes ol").innerHTML = axesContainer.innerHTML;
                bodyContainers.querySelector("dd.buttons ol").innerHTML = buttonsContainer.innerHTML;
            } else {
                // 接続を解除するとnullになる機種もあれば最後の状態を取得できる機種（DualShock4）もある
                bodyContainers.querySelector("dd.connected").innerText = "";
            }
        }
    }
}

/**
 * Update the key log
 * 
 * @returns {void}
 */
const updateKeyLog = () => {
    if (parameterSetting.checkModes([MODES_KEYLOG, MODES_DEBUG])) {
        keyLogTemplate.className = logs[0];
        keyLogContainer.prepend(keyLogTemplate.cloneNode(true));
    }
}

/**
 * Update the game controller
 * 
 * @param {string} [className]
 * @returns {void}
 */
const updateGameController = (className = "") => {
    if (parameterSetting.checkModes([MODES_CONTROLLER, MODES_DEBUG])) {
        controllerContainer.className = className;
    }
}

/**
 * Add the Log
 * 
 * @param {string[]} [log]
 * @returns {boolean}
 */
const addLog = (log = []) => {
    let className = log.join(" ");
    if (className != latestLog) {
        latestLog = className;
        if ("" != latestLog) {
            logs.unshift(latestLog = className);
            if (parameterSetting.logLimit() < logs.length) {
                logs.pop();
                if (keyLogContainer.lastChild) {
                    keyLogContainer.removeChild(keyLogContainer.lastChild);
                }
            }
            updateKeyLog();
            updateDeck(log);
        }
        return true;
    }
    return false;
}

/**
 * Update the directional buttons
 * 
 * @param {array} gamepad GamepadAPI.getGamepads()[index]
 * @returns {object}
 */
 const updateDirectionalButtons = (gamepad) => {
    let res;
    let directionalButtons = parameterSetting.directionalButtons();
    if (directionalButtons) {
        res = directionalButtons;
    } else if (gamepad && gamepad.axes && (10 == gamepad.axes.length)) {
        res = (parameterSetting.directionalButtons({
            up: [],
            down: [],
            left: [],
            right: []
        }));
    } else {
        res = parameterSetting.directionalButtons(ParameterSetting.DEFAULT_DIRECTIONAL_BUTTONS);
    }
    return res;
}

/**
 * Scan the game controllers
 * 
 * @returns {void}
 */
const scanGameControllers = () => {
    let gamepadList = Gamepad.getGamePads();
    let controllerIndex = parameterSetting.controllerIndex();
    let gamepad = gamepadList[controllerIndex];
    updateDebug(gamepadList);
    if (gamepad && (!latestGamepad || (latestGamepad.timestamp() != gamepad.timestamp))) {
        updateDirectionalButtons(gamepad);
        latestGamepad = Gamepad.factory(gamepad, controllerIndex, latestGamepad);
        if (latestGamepad.notEntered()) {
            addLog([]);
            updateGameController();
        } else {
            let classNames = [];
            classNames = classNames.concat(formatAxisInputClassNames(latestGamepad.leftAxis()));
            classNames = classNames.concat(formatAxisInputClassNames(latestGamepad.rightAxis()));
            classNames = classNames.concat(formatAxisInputClassNames(latestGamepad.buttons().directional()));
            latestGamepad.buttons().getAll().forEach(button => {
                if (button.pressed()) {
                    classNames = classNames.concat(formatButtonInputClassName(button));
                }
            });
            if (addLog(classNames)) {
                updateGameController(logs[0]);
            }
        }
    }
}

/**
 * Initialize the HTML
 * 
 * @returns {void}
 */
const initHtml = () => {
    let baseContainer = document.getElementById(ID_CONTAINER);
    let keyLogTemplateSub = document.createElement("li");
    for (let i = 0; i < parameterSetting.keyLogItems(); i++) {
        keyLogTemplate.appendChild(keyLogTemplateSub.cloneNode(false));
    }
    baseContainer.dataset.modes = parameterSetting.modes().join(" ");
    baseContainer.dataset.styles = parameterSetting.styles();
    baseContainer.dataset.controller = parameterSetting.controllerIndex();
    baseContainer.dataset.log = parameterSetting.logLimit();
    baseContainer.dataset.excludeButtons = parameterSetting.excludeButtons().join(" ");
    updateSettingsContainer();
    window.setTimeout((() => {
        baseContainer.dataset.standby = "false";
    }), 3000);
    updateParameterSettingGenerator();
}

/**
 * Parameter setting generator
 * 
 * @class
 */
class ParameterSettingGenerator {

    /**
     * @returns {HTMLElement}
     */
    static crateDeckItemContainerTemplate = () => {
        let inputElement = (() => {
            let ele = document.createElement("input");
            return ele;
        })();
        let indexElement = ((ele) => {
            ele.name = "deckIndex";
            ele.type = "number";
            ele.min = 0;
            // ele.max = 999;
            ele.maxlength = "3";
            ele.placeholder = "";
            ele.title = "ボタン番号";
            return ele;
        })(inputElement.cloneNode(false));
        let valueElement = ((ele) => {
            ele.name = "deckValue";
            ele.type = "text";
            ele.placeholder = "";
            ele.title = "ファイルパス";
            return ele;
        })(inputElement.cloneNode(false));
        // let fileContainer = (() => {
        //     let cnt = document.createElement("label");
        //     let fileElement = ((ele) => {
        //         ele.name = "deckFile";
        //         ele.type = "file";
        //         ele.accept = "video/*,audio/*,image/*"
        //         return ele;
        //     })(inputElement.cloneNode(false));
        //     let label = document.createElement("span");
        //     label.innerText = "File";
        //     label.title = "ファイルから入力する";
        //     cnt.append(label);
        //     cnt.append(fileElement);
        //     return cnt;
        // })();
        // let buttonElement = ((ele) => {
        //     ele.type = "button";
        //     return ele;
        // })(inputElement.cloneNode(false));
        // let delButton = ((ele) => {
        //     ele.name = "deckDel";
        //     ele.value = "-";
        //     ele.title = "Clear";
        //     return ele;
        // })(buttonElement.cloneNode(false));
        // let addButton = ((ele) => {
        //     ele.name = "deckAdd";
        //     ele.value = "+";
        //     ele.title = "Add";
        //     return ele;
        // })(buttonElement.cloneNode(false));
        let deckItemContainer = (() => {
            let container = document.createElement("li");
            [indexElement, valueElement].forEach(ele => {
                container.append(ele);
            });
            return container;
        })();
        return deckItemContainer;
    }

    constructor() {

        /** @type {HTMLElement} */
        this._deckItemContainerTemplate = ParameterSettingGenerator.crateDeckItemContainerTemplate();

        this._container = document.querySelector("#GIDGenerator");
        this._container.querySelector("#deckAdd").addEventListener("click", () => {
            this.addDeckItemContainer();
        });
        this._container.querySelector("#generate").addEventListener("click", () => {
            let settings = [];
            let directional = {};
            let deck = [];
            let modes;
            let controllerIndex;
            let elements = document.forms.GIDGenerator.elements;
            const addSetting = (key, value) => {
                if ((undefined !== value) && (null !== value)) {
                    settings.push(`${key}=${value}`);
                }
            }
            [ParameterSetting.KEY_INPUT_DELAY,
                    ParameterSetting.KEY_EXCLUDE_BUTTONS,
                    ParameterSetting.KEY_BUTTON_INDEX_CONVERTS,
                    `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Up`,
                    `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Down`,
                    `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Left`,
                    `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Right`,
                    ParameterSetting.KEY_LOG_LIMIT,
                    ParameterSetting.KEY_KEY_LOG_ITEMS,
                    ParameterSetting.KEY_STYLES,
                    ParameterSetting.KEY_MODES,
                    ParameterSetting.KEY_CONTROLLER_INDEX].forEach(key => {
                let value = elements[key].value;
                if (value) {
                    switch (key) {
                        case `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Up`:
                        case `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Down`:
                        case `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Left`:
                        case `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Right`:
                            directional[key] = value;
                            break;
                        // case ParameterSetting.KEY_MODES:
                        //     if (ParameterSetting.DEFAULT_MODES != value) {
                        //         modes = value;
                        //     }
                        //     break;
                        case ParameterSetting.KEY_CONTROLLER_INDEX:
                            controllerIndex = value;
                            break;
                        default:
                            addSetting(key, value);
                            break;
                    }
                }
            });
            addSetting(ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES, (() => {
                let res = [];
                [`${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Up`,
                        `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Down`,
                        `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Left`,
                        `${ParameterSetting.KEY_DIRECTIONAL_BUTTON_INDEXES}Right`].forEach(key => {
                    res.push(directional[key]);
                });
                if ("---" != res.join("-")) {
                    return res.join("-");
                }
                return null;
            })());
            elements.deckValue.forEach((ele, index) => {
                let deckIndex = (() => {
                    if (elements.deckIndex[index].value) {
                        return Number(elements.deckIndex[index].value);
                    }
                    return -1;
                })();
                if (ele.value && (0 <= deckIndex)) {
                    deck.push(`${deckIndex}-${encodeURIComponent(ele.value)}`);
                }
            });
            if (0 < deck.length) {
                addSetting(ParameterSetting.KEY_DECK, deck.join(","))
            }
            addSetting(ParameterSetting.KEY_MODES, modes);
            addSetting(ParameterSetting.KEY_CONTROLLER_INDEX, controllerIndex);
            elements.result.value = (() => {
                if (0 < settings.length) {
                    // return `${location.origin}${location.pathname}?${settings.join("&")}`;
                    return `?${settings.join("&")}`;
                }
                return "?";
            })();
            elements.result.select();
            document.execCommand("copy");
        });
    }

    /**
     * Container
     * 
     * @returns {HTMLElement}
     */
    container() {
        return this._container;
    }

    /**
     * Add the deck item container
     * 
     * @param {number} [index]
     * @param {string} [value]
     * @returns {void}
     */
    addDeckItemContainer(index = "", value = "") {
        this.container().querySelector("#GIDGenerator .deck ul").append(((ele) => {
            ele.querySelectorAll("input").forEach(input => {
                switch (input.name) {
                    case "deckIndex":
                        input.placeholder = index;
                        break;
                    case "deckValue":
                        input.placeholder = value;
                        break;
                    default:
                        break;
                }
            });
            // ele.querySelector('[name="deckFile"]').addEventListener("change", function() {
            //     let reader = new FileReader();
            //     reader.readAsDataURL(this.files[0]);
            //     reader.onload = () => {
            //         console.log(reader);
            //     };
            // });
            // ele.querySelector('[name="deckDel"]').addEventListener("click", (event) => {
            //     ele.querySelectorAll('[name="deckValue"]').forEach(input => {
            //         input.value = "";
            //     });
            // });
            // ele.querySelector('[name="deckAdd"]').addEventListener("click", () => {
            //     this.addDeckItemContainer();
            // });
            return ele;
        })(this._deckItemContainerTemplate.cloneNode(true)));
    }
}

/**
 * Update the parameter setting generator
 * 
 * @returns {void}
 */
const updateParameterSettingGenerator = () => {
    let generator = new ParameterSettingGenerator();
    generator.addDeckItemContainer(0, "Clear");
    generator.addDeckItemContainer(11, "Reset");
    for (let i = 1; i < 11; i++) {
        if (11 !== i) {
            generator.addDeckItemContainer(i, `C:\\Videos\\Sample_${i}.mp4`);
        }
    }
}

/**
 * Update the settings container
 * 
 * @returns {void}
 */
const updateSettingsContainer = () => {
    let settingsContainer = document.querySelector(`#${ID_DEBUG} > .settings > dl`);
    settingsContainer.querySelector("dd.controllerIndex").innerText = parameterSetting.controllerIndex();
    [settingsContainer.querySelector("dd.excludes")].forEach(ele => {
        let excludeButtons = parameterSetting.excludeButtons().join(" ");
        ele.innerText = excludeButtons;
        ele.setAttribute("title", excludeButtons);
    });
    [settingsContainer.querySelector("dd.converts")].forEach(ele => {
        let buttonIndexConverts = parameterSetting.find(ParameterSetting.KEY_BUTTON_INDEX_CONVERTS);
        ele.innerText = buttonIndexConverts;
        ele.setAttribute("title", buttonIndexConverts);
    });
    settingsContainer.querySelector("dd.logLimit").innerText = parameterSetting.logLimit();
    settingsContainer.querySelector("dd.inputDelay").innerText = `${parameterSetting.delay()}ms`;
    settingsContainer.querySelector("dd.modes").innerText = parameterSetting.modes().join(",");
    [settingsContainer.querySelector("dd.styles")].forEach(ele => {
        let styles = parameterSetting.styles();
        ele.innerText = styles;
        ele.setAttribute("title", styles);
    });
    settingsContainer.querySelector("dd.items").innerText = parameterSetting.keyLogItems();
    let directionalContainers = settingsContainer.querySelectorAll("dd.directionals dd");
    let directionalButtons = parameterSetting.directionalButtons();
    if (directionalButtons) {
        [directionalButtons.up, directionalButtons.down, directionalButtons.left, directionalButtons.right].forEach((vals, index) => {
            directionalContainers.item(index).append(vals.join(","));
        });
    }
}

/**
 * Update the deck
 * 
 * @param {string[]} log
 * @returns {void}
 */
 const updateDeck = (log) => {
    if (parameterSetting.checkModes([MODES_DECK])) {
        parameterSetting.deck().update(latestGamepad);
    }
}

/**
 * Initialize
 * 
 * @returns {void}
 */
const init = () => {
    initHtml();
    if (!('ongamepadconnected' in window)) {
        // const looper = window.requestAnimationFrame
        //         || window.webkitRequestAnimationFrame
        //         || window.mozRequestAnimationFrame
        //         || window.msRequestAnimationFrame
        //         || window.oRequestAnimationFrame
        //         || ((callback) => {
        //             window.setTimeout(callback, delay);
        //         });
        const looper = (callback) => {
            window.setTimeout(callback, parameterSetting.delay());
        };
        const main = () => {
            scanGameControllers();
            looper(main);
        }
        main();
    }
}

