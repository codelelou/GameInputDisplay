/**
 * Key: Button
 * 
 * @type {string}
 */
const KEY_BUTTON = 'button';

/**
 * Key: Face
 * 
 * @type {string}
 */
const KEY_FACE = 'face';

/**
 * Key: labels
 * 
 * @type {string}
 */
const KEY_LABELS = 'labels';

/**
 * Key: Quantity
 * 
 * @type {string}
 */
const KEY_QUANTITY = 'quantity';

/**
 * Dice
 * 
 * @class
 */
class Dice {

    /**
     * Default: Face
     * 
     * @type {number}
     */
    static DEFAULT_FACE = 6;

    /**
     * Default: Quantity
     * 
     * @type {number}
     */
    static DEFAULT_QUANTITY = 1;

    /**
     * @param {number} [face] 
     * @param {number} [quantity] 
     */
    constructor(face = Dice.DEFAULT_FACE, quantity = Dice.DEFAULT_QUANTITY) {

        let total = -1;

        /** @type {array} */
        this._labels = (() => {
            let labels = (new URL(window.location.href)).searchParams.get(KEY_LABELS);
            if (Utility.notEmpty(labels) && (2 <= (labels = decodeURIComponent(labels).split(',')).length)) {
                face = labels.length;
            } else {
                labels = [];
                total = 0;
                for (let i = 0; i < 99; i++) {
                    labels.push(i + 1);
                }
            }
            return labels;
        })();

        /** @type {number} */
        this._total = total;

        this.update(face, quantity);
    }

    /**
     * Face
     * 
     * @param {number} [add]
     * @param {number} [min]
     * @param {number} [max]
     * @returns {number}
     */
    face(add, min = 2, max = 99) {
        return (this._face = this._update(this._face, add, min, max));
    }

    /**
     * Labels
     * 
     * @returns {array}
     */
    labels() {
        return this._labels;
    }

    /**
     * Quantity
     * 
     * @param {number} [add]
     * @param {number} [min]
     * @param {number} [max]
     * @returns {number}
     */
    quantity(add, min = 1, max = 9) {
        return (this._quantity = this._update(this._quantity, add, min, max));
    }

    /**
     * Results
     * 
     * @returns {array}
     */
    results() {
        return this._results;
    }

    /**
     * Total
     * 
     * @param {number} [total]
     * @returns {number}
     */
    total(total) {
        if (0 <= total) {
            return (this._total = total);
        }
        return this._total;
    }

    /**
     * Update
     * 
     * @param {number} [face] 
     * @param {number} [quantity] 
     * @returns {Dice}
     */
    update(face = Dice.DEFAULT_FACE, quantity = Dice.DEFAULT_QUANTITY) {

        let results = (() => {
            let results = [];
            let labels = this.labels();
            for (let i = 0; i < quantity; i++) {
                results.push(labels[Math.floor(Math.random() * (face))]);
            }
            return results;
        })();

        if (-1 !== this.total()) {
            this.total((() => {
                let total = 0;
                results.forEach(result => {
                    total += result;
                });
                return total;
            })());
        }

        /** @type {number} */
        this._face = face;

        /** @type {number} */
        this._quantity = quantity;

        /** @type {array} */
        this._results = results;

        return this;
    }

    /**
     * Update at face or quantity
     * 
     * @param {number} value 
     * @param {number} [add] 
     * @param {number} [max]
     * @returns 
     */
    _update(value, add, min = 1, max = 99) {
        if (Number.isInteger(add)) {
            value += add;
            if (min > value) {
                value = min;
            } else if (max < value) {
                value = max;
            }
        }
        return value;
    }
}

let dice = new Dice();

const dices = {
    data() {
        return {
            currentFocus: KEY_BUTTON,
            deck: false,
            dice: dice,
            face: dice.face(),
            frame: (window != parent),
            quantity: dice.quantity(),
            ready: true,
            stop: false
        }
    },
    mounted() {
        this.$refs[this.currentFocus].focus();
        this.loop();
    },
    methods: {
        button: function(event) {
            this.stop = !this.stop;
            if (!this.stop) {
                this.loop();
            }
        },
        change: function(event) {
            dice.update(this.face, this.quantity);
        },
        focus: function(event) {
            this.currentFocus = event.target.name;
        },
        loop: function() {
            const _callback = () => {
                this.updateDices();
                if (!this.stop) {
                    Utility.requestAnimationFrame(_callback);
                }
            }
            _callback();
        },
        updateDices: function() {
            this.dice.update(dice.face(), dice.quantity());
        }
    }
};
let app = Vue.createApp(dices);
let vm = app.mount('#CONTAINER');

// GameInputDisplay（Deckモード）との通信
window.addEventListener('message', function (event) {
    switch (event.data.action) {
        case Deck.NAME_MESSAGE:  // GameInputDisplay（Deckモード）からのメッセージの場合
            if (DeckItem.STATE_PLAY == event.data.message.state) {  // GameInputDisplay（Deckモード）で表示中の場合
                let axes = event.data.message.axes;  // 十字キーボタン・左スティック・右スティック
                let values = [...axes.commands, ...axes.leftAxis, ...axes.rightAxis];  // 方向入力値配列
                vm.deck = true;
                switch (vm.currentFocus) {
                    case KEY_FACE:  // 面入力欄にフォーカスがある場合
                        if (values.includes(Axis.VALUE_RIGHT)) {  // 右入力の場合
                            vm.$refs.quantity.focus();
                        } else if (values.includes(Axis.VALUE_UP)) {  // 上入力の場合
                            vm.face = vm.dice.face(1);
                        } else if (values.includes(Axis.VALUE_DOWN)) {  // 下入力の場合
                            vm.face = vm.dice.face(-1);
                        }
                        break;
                    case KEY_QUANTITY:  // 個数入力欄にフォーカスがある場合
                        if (values.includes(Axis.VALUE_RIGHT)) {  // 右入力の場合
                            vm.$refs.button.focus();
                        } else if (values.includes(Axis.VALUE_LEFT)) {  // 左入力の場合
                            vm.$refs.face.focus();
                        } else if (values.includes(Axis.VALUE_UP)) {  // 上入力の場合
                            vm.quantity = vm.dice.quantity(1);
                        } else if (values.includes(Axis.VALUE_DOWN)) {  // 下入力の場合
                            vm.quantity = vm.dice.quantity(-1);
                        }
                        break;
                    case KEY_BUTTON:  // ボタンにフォーカスがある場合
                        if (values.includes(Axis.VALUE_LEFT)) {  // 左入力の場合
                            vm.$refs.quantity.focus();
                        } else if (values.includes(Axis.VALUE_DOWN)) {  // 下入力の場合
                            vm.button();
                        }
                        break;
                    default:
                        break;
                }
                break;
            }
        default:
            break;
    }
});
