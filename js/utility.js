/**
 * Utility
 * 
 * @class
 */
class Utility {

    /**
     * requestAnimationFrame
     * 
     * @param {number} [delay] 
     * @returns {callback}
     */
    static requestAnimationFrame = (callback, delay = 16) => {
        (window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.msRequestAnimationFrame
        || window.oRequestAnimationFrame
        || ((callback) => {
            window.setTimeout(callback, 16);
        }))(callback);
    };

    /**
     * Is empty
     * 
     * @param {any} val
     * @returns {boolean} 
     */
    static isEmpty(val) {
        return (undefined === val) || (null === val) || ('' === val);
    }

    /**
     * Not empty
     * 
     * @param {any} val 
     * @returns {boolean} 
     */
    static notEmpty(val) {
        return !Utility.isEmpty(val);
    }

    /**
     * Zero padding
     * 
     * @param {string|number} val
     * @param {number} targetLength
     * @param {string} [padString]
     * @returns {string} 
     */
    static zeroPadding(val, targetLength, padString) {
        if (Utility.notEmpty(targetLength)) {
            return ("" + val).padStart(targetLength, padString);
        }
        return val;
    }
}
