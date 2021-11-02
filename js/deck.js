/**
 * Deck container abstract
 * 
 * @class
 */
 class DeckContainer_Abstract {

    /**
     * Type: Audio
     * 
     * @type {string}
     */
    static TYPE_AUDIO = "Audio";

    /**
     * Type: HTML
     * 
     * @type {string}
     */
    static TYPE_HTML = "HTML";

    /**
     * Type: Image
     * 
     * @type {string}
     */
    static TYPE_IMAGE = "Image";

    /**
     * Type: Media
     * 
     * @type {string}
     */
    static TYPE_MEDIA = "Media";

    /**
     * Type: Other
     * 
     * @type {string}
     */
    static TYPE_OTHER = "Other";

    /**
     * Type: Video
     * 
     * @type {string}
     */
    static TYPE_VIDEO = "Video";

    /**
     * Factory
     * 
     * @param {DeckItem} item
     * @returns {DeckContainer_Abstract}
     */
    static factory = (item) => {
        let res;
        switch (item.type()) {
            case DeckContainer_Abstract.TYPE_AUDIO:
                res = new DeckContainer_Audio(item);
                break;
            case DeckContainer_Abstract.TYPE_HTML:
            case DeckContainer_Abstract.TYPE_OTHER:
                res = new DeckContainer_Html(item);
                break;
            case DeckContainer_Abstract.TYPE_IMAGE:
                res = new DeckContainer_Image(item);
                break;
            case DeckContainer_Abstract.TYPE_VIDEO:
                res = new DeckContainer_Video(item);
            default:
                break;
        }
        return res;
    }

    /**
     * @param {DeckItem} item
     * @param {string} [type]
     */
    constructor(item, type) {

        /** @type {HTMLElement} */
        this._element;

        /** @type {DeckItem} */
        this._item = item;

        /** @type {string} */
        this._state;

        /** @type {number} */
        this._volume = 0.5;

        // /** @type {string} */
        // this._type = type;
    }

    /**
     * Clear
     * 
     * @returns {void}
     */
    clear() {
        this.state(DeckItem.STATE_CLEAR);
    }

    /**
     * Get
     * 
     * @returns {HTMLElement}
     */
    get() {
        if (!this._element) {
            return (this._element = this._createHtmlElement());
        }
        return this._element;
    }

    /**
     * Item
     * 
     * @returns {DeckItem}
     */
    item() {
        return this._item;
    }

    /**
     * Pause
     * 
     * @returns {void}
     */
    pause() {
        this.state(DeckItem.STATE_PAUSE);
    }

    /**
     * Play
     * 
     * @param {callback} callback
     * @param {number} [volume]
     * @returns {void}
     */
    play(callback, volume) {
        if (this.playing()) {
            this.pause();
        } else {
            if (typeof callback === "function") {
                callback();
            } else if (Number(callback)) {
            }
            this.state(DeckItem.STATE_PLAY);
        }
    }

    /**
     * Playing
     * 
     * @returns {boolean}
     */
    playing() {
        return DeckItem.STATE_PLAY == this.state();
    }
    
    /**
     * Skip
     * 
     * @param {number} second 
     * @returns {number}
     */
    skip(second) {
        return -1;
    }

    /**
     * State
     * 
     * @param {string} [state]
     * @returns {string}
     */
    state(state) {
        if (state) {
            this.get().parentElement.dataset.state = state;
            return (this._state = state);
        }
        return this._state;
    }

    /**
     * Volume
     * 
     * @param {number} [volume]
     * @returns {number}
     */
    volume(volume) {
        if ((0 === volume) || Number(volume)) {
            if (0 > volume) {
                volume = 0;
            } else if (1 < volume) {
                volume = 1;
            }
            return (this._volume = volume);
        }
        return this._volume;
    }

    /**
     * Create the HTML element
     * 
     * @returns {HTMLElement}
     */
    _createHtmlElement() {
        return null;
    }
}

/**
 * Deck container: HTML
 * 
 * @class
 */
class DeckContainer_Html extends DeckContainer_Abstract {

    /**
     * @param {DeckItem} item
     */
    constructor(item) {
        super(item, DeckContainer_Abstract.TYPE_HTML);
    }

    /**
     * Create the HTML element
     * 
     * @returns {HTMLElement}
     */
    _createHtmlElement() {
        let element = document.createElement("iframe");
        element.src = this.item().value();
        return element;
    }
}

/**
 * Deck container: Image
 * 
 * @class
 */
class DeckContainer_Image extends DeckContainer_Abstract {

    /**
     * @param {DeckItem} item
     */
    constructor(item) {
        super(item, DeckContainer_Abstract.TYPE_IMAGE);
    }

    /**
     * Create the HTML element
     * 
     * @returns {HTMLElement}
     */
    _createHtmlElement() {
        let element = document.createElement("img");
        element.src = this.item().value();
        return element;
    }
}

/**
 * Deck container: Media
 * 
 * @class
 */
class DeckContainer_Media extends DeckContainer_Abstract {

    /**
     * @param {DeckItem} item
     */
    constructor(item) {
        super(item, DeckContainer_Abstract.TYPE_MEDIA);
    }

    /**
     * Pause
     * 
     * @returns {void}
     */
    pause() {
        super.pause();
        this.get().pause();
    }

    /**
     * Play
     * 
     * @returns {void}
     */
    play() {
        super.play(() => {
            this.get().play();
        });
    }

    /**
     * Skip
     * 
     * @param {number} second 
     * @returns {number}
     */
    skip(second) {
        let currentTime = this._currentTime();
        if (Number(second)) {
            return this._currentTime(currentTime + second);
        }
        return currentTime;
    }

    /**
     * Stop
     * 
     * @returns {void}
     */
    clear() {
        this.pause();
        super.clear();
        this._currentTime(0);
    }

    /**
     * Volume
     * 
     * @param {number} [volume]
     * @returns {number}
     */
    volume(volume) {
        volume = super.volume(volume);
        if (volume != this.get().volume) {
            this.get().volume = volume;
        }
        return volume;
    }

    /**
     * Create the HTML element
     * 
     * @returns {HTMLElement}
     */
    _createHtmlElement() {
        let setting = this._getHtmlElementSetting();
        let element = document.createElement(setting.tag);
        let source = document.createElement("source");
        element.autoplay = true;
        element.loop = true;
        element.volume = 1;
        source.src = this.item().value();
        source.type = setting.type;
        element.append(source);
        return element;
    }

    /**
     * Current time
     * 
     * @param {number} second
     * @return {number} 
     */
    _currentTime(second) {
        let media = this.get();
        let currentTime = media.currentTime;
        if ((0 === second) || Number(second)) {
            if (0 > second) {
                second = 0;
            } else if (second > media.duration) {
                second = media.duration;
            }
            if (currentTime != second) {
                return (media.currentTime = second);
            }
        }
        return currentTime;
    }

    /**
     * Get the HTML element setting
     * 
     * @return {object}
     */
    _getHtmlElementSetting() {
        let res = {
            tag: "",
            type: ""
        };
        let filePath = this.item().value();
        switch (this.item().type()) {
            case DeckContainer_Abstract.TYPE_AUDIO:
                res.tag = "audio";
                if (/\.mp3$/.test(filePath)) {
                    res.type = "audio/mpeg"
                } else if (/\.ogg$/.test(filePath)) {
                    res.type = "audio/ogg"
                } else if (/\.wav$/.test(filePath)) {
                    res.type = "audio/wav"
                } else if (/\.aac$/.test(filePath)) {
                    res.type = "audio/aac"
                } else if (/\.flac$/.test(filePath)) {
                    res.type = "audio/flac"
                }
                break;
            case DeckContainer_Abstract.TYPE_VIDEO:
                res.tag = "video";
                if (/\.mp4$/.test(filePath)) {
                    res.type = "video/mp4"
                } else if (/\.webm$/.test(filePath)) {
                    res.type = "video/webm"
                }
                break;
            default:
                break;
        }
        return res;
    }
}

/**
 * Deck container: Audio
 * 
 * @class
 */
class DeckContainer_Audio extends DeckContainer_Media {

    /**
     * @param {DeckItem} item
     */
    constructor(item) {
        super(item, DeckContainer_Abstract.TYPE_AUDIO);
    }
}

/**
 * Deck container: Video
 * 
 * @class
 */
class DeckContainer_Video extends DeckContainer_Media {

    /**
     * @param {DeckItem} item
     */
    constructor(item) {
        super(item, DeckContainer_Abstract.TYPE_VIDEO);
    }
}

/**
 * Deck item
 * 
 * @class
 */
class DeckItem {

    /**
     * State: Clear
     * 
     * @type {string}
     */
    static STATE_CLEAR = "Clear";

    /**
     * State: Pause
     * 
     * @type {string}
     */
    static STATE_PAUSE = "Pause";

    /**
     * State: Play
     * 
     * @type {string}
     */
    static STATE_PLAY = "Play";

    /**
     * Get the type
     * 
     * @param {string} value
     * @returns {string}
     */
    static getType = (value) => {
        let type = DeckContainer_Abstract.TYPE_OTHER;
        if (/^.+(\.html|\.htm)$/.test(value)) {
            type = DeckContainer_Abstract.TYPE_HTML;
        } else if (/^.+(\.png|\.jpeg|\.jpg|\.gif|\.bmp)$/.test(value)) {
            type = DeckContainer_Abstract.TYPE_IMAGE;
        } else if (/^.+(\.wav|\.wave|\.mp3|\.ogg|\.aac|\.flac)$/.test(value)) {
            type = DeckContainer_Abstract.TYPE_AUDIO;
        } else if (/^.+(\.mp4|\.webm)$/.test(value)) {
            type = DeckContainer_Abstract.TYPE_VIDEO;
        }
        return type;
    }

    /**
     * @param {number[]} indexes
     * @param {string} value
     */
    constructor(indexes, value) {

        /** @type {DeckContainer_Abstract} */
        this._container;

        this._indexes = indexes;
        
        this._value = value;
    }

    /**
     * @callback IsContainerCallback
     * @param {DeckContainer_Abstract} container 
     * @returns {void}
     */

    /**
     * Container
     * 
     * @param {IsContainerCallback} [isCallback]
     * @param {boolean} [create]
     * @returns {DeckContainer_Abstract}
     */
    container(isCallback, create = false) {
        let container;
        if ((true === isCallback) || (false == isCallback)) {
            return this.container(null, isCallback);
        } else {
            container = this._container;
            if (!container && create) {
                this._container = (container = DeckContainer_Abstract.factory(this));
            }
            if (container && (typeof isCallback === "function")) {
                isCallback(container);
            }
        }
        return container;
    }

    /**
     * Indexes
     * 
     * @returns {number[]}
     */
    indexes() {
        return this._indexes;
    }

    /**
     * Play
     * 
     * @param {number} [volume]
     * @returns {void}
     */
    play(volume) {
        this.container(container => {
            container.play(volume);
        });
    }

    /**
     * Reset
     * 
     * @returns {void}
     */
    reset() {
        this._container = null;
    }

    /**
     * Type
     * 
     * @returns {string}
     */
    type() {
        if (!this._type) {
            return (this._type = DeckItem.getType(this.value()));
        }
        return this._type;
    }

    /**
     * Update the order
     * 
     * @param {number} order
     * @returns {void}
     */
    updateOrder(order) {
        this.container(container => {
            container.get().parentElement.style.zIndex = order;
        });
    }

    /**
     * Value
     * 
     * @returns {string}
     */
    value() {
        return this._value;
    }
}

/**
 * Deck
 * 
 * @class
 */
class Deck {

    /**
     * Name: Message
     * 
     * @type {string}
     */
    static NAME_MESSAGE = "GameInputDisplay";

    /**
     * @param {number[]} [clearIndexes]
     * @param {number[]} [resetIndexes]
     */
    constructor(clearIndexes = [0], resetIndexes = [11]) {

        /** @type {number[]} */
        this._clearIndexes = clearIndexes;

        /** @type {number} */
        this._count = 0;

        /** @type {DeckItem[]} */
        this._items = [];

        /** @type {number[]} */
        this._resetIndexes = resetIndexes;

        /** @type {number} */
        this._volume = 0.5;
    }

    /**
     * Add
     *
     * @param {DeckItem} deck
     * @returns {void}
     */
    add(deck) {
        this._items.push(deck);
    }

    /**
     * Find
     * 
     * @param {number} index
     * @returns {DeckItem[]}
     */
    find(index) {
        let res = [];
        this.getAll().forEach(deck => {
            if (deck.indexes().includes(index)) {
                res.push(deck);
            }
        });
        return res;
    }

    /**
     * Get the all
     * 
     * @returns {DeckItem[]}
     */
    getAll() {
        return this._items;
    }

    /**
     * Skip
     * 
     * @param {number} second
     * @returns {void}
     */
    skip(second) {
        this.getAll().forEach(item => {
            item.container(container => {
                if (container.playing()) {
                    container.skip(second);
                }
            });
        });
    }

    /**
     * Clear all
     * 
     * @returns {void}
     */
    clearAll() {
        this.getAll().forEach(item => {
            item.container(container => {
                container.clear();
            });
        });
    }

    /**
     * Clear indexes
     * 
     * @param {number[]} [indexes]
     * @returns {number[]}
     */
    clearIndexes(indexes) {
        if (indexes) {
            return (this._clearIndexes = indexes);
        }
        return this._clearIndexes;
    }

    /**
     * Reset all
     * 
     * @returns {void}
     */
    resetAll() {
        this.getAll().forEach(item => {
            item.reset();
        });
        mediaViewerContainer.innerHTML = "";
    }

    /**
     * Reset indexes
     * 
     * @param {number[]} [indexes]
     * @returns {number[]}
     */
    resetIndexes(indexes) {
        if (indexes) {
            return (this._resetIndexes = indexes);
        }
        return this._resetIndexes;
    }

    /**
     * Update
     * 
     * @param {Gamepad} gamepad
     * @returns {void}
     */
    update(gamepad) {
        let flag = false;
        let count = this._count++;
        let buttons = gamepad.buttons();
        for (const index of this.resetIndexes()) {
            if (0 < buttons.find(index).length) {
                flag = true;
                this.resetAll();
                break;
            }
        }
        if (!flag) {
            for (const index of this.clearIndexes()) {
                if (0 < buttons.find(index).length) {
                    flag = true;
                    this.clearAll();
                    break;
                }
            }
        }
        if (!flag) {
            if (gamepad.commands().yAxis().includes(Axis.VALUE_DOWN)
                    || gamepad.leftAxis().yAxis().includes(Axis.VALUE_DOWN)) {
                this.volume(-0.1);
            } else if (gamepad.commands().yAxis().includes(Axis.VALUE_UP)
                    || gamepad.leftAxis().yAxis().includes(Axis.VALUE_UP)) {
                this.volume(0.1);
            } else if (gamepad.commands().xAxis().includes(Axis.VALUE_LEFT)
                    || gamepad.leftAxis().xAxis().includes(Axis.VALUE_LEFT)) {
                this.skip(-5);
            } else if (gamepad.commands().xAxis().includes(Axis.VALUE_RIGHT)
                    || gamepad.leftAxis().xAxis().includes(Axis.VALUE_RIGHT)) {
                this.skip(5);
            } else {
                for (const button of buttons.getAll()) {
                    if (!button.hold()) {
                        this.find(button.index()).forEach(item => {
                            let container = item.container(true);
                            if (container) {
                                let itemValueHash = encodeURIComponent(item.value());
                                if (!mediaViewerContainer.querySelector(`[data-value="${itemValueHash}"][data-index*="ButtonIndex_${button.index()}"]`)) {
                                    let rapper = document.createElement("div");
                                    let indexes = [];
                                    item.indexes().forEach(index => {
                                        indexes.push(`ButtonIndex_${index}`);
                                    });
                                    rapper.dataset.type = item.type();
                                    rapper.dataset.index = indexes.join(" ");
                                    rapper.dataset.value = itemValueHash;
                                    rapper.append(container.get());
                                    mediaViewerContainer.append(rapper);
                                }
                                item.play(this.volume());
                                item.updateOrder(count);
                            }
                        });
                    }
                }
            }
        }
        this.getAll().forEach(item => {
            if ([DeckContainer_Abstract.TYPE_HTML, DeckContainer_Abstract.TYPE_OTHER].includes(item.type())) {
                item.container(container => {
                    container.get().contentWindow.postMessage({
                        action: Deck.NAME_MESSAGE,
                        message: {
                            axes: {
                                commands: gamepad.commands().values(),
                                leftAxis: gamepad.leftAxis().values(),
                                rightAxis: gamepad.rightAxis().values()
                            },
                            state: container.state(),
                            type: item.type(),
                            url: window.location.href,
                            volume: this.volume()
                        }
                    }, "*");
                });
            }
        });

    }

    /**
     * Volume
     * 
     * @param {number} add
     * @returns {number}
     */
    volume(add) {
        let volume = this._volume * 100;
        if ((0 > add) || (0 < add)) {
            volume = volume + (add * 100);
            if (0 > volume) {
                volume = 0;
            } else if (100 < volume) {
                volume = 100;
            }
            volume = volume / 100;
            this._volume = volume;
        } else {
            volume = volume / 100;
        }
        this.getAll().forEach(item => {
            item.container(container => {
                container.volume(volume);
            });
        });
        return volume;
    }
}

let mediaViewerContainer = document.getElementById("GIDDeck");
