/**
 * A collection of function that help with immutable state updates.
 */

// Reference: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
/**
 * Insert an item into an immutable array.
 *
 * @param {Array} array 
 * @param {number} index 
 * @param {object} item 
 */
export function insertItem(array, index, item) {
    let newArray = array.slice()
    newArray.splice(index, 0, item)
    return newArray
}

/**
 * Add an item to the start of an immutable array.
 *
 * @param {Array} array 
 * @param {object} item 
 */
export function prependItem(array, item) {
    return insertItem(array, 0, item)
}

/**
 * Add an item to the end of an immutable array.
 *
 * @param {Array} array 
 * @param {object} item 
 */
export function appendItem(array, item) {
    return insertItem(array, array.length - 1, item)
}

// Reference: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
/**
 * Update an item in an immutable array.
 *
 * @param {Array} array 
 * @param {number} index 
 * @param {object} newItem 
 */
export function updateItem(array, index, newItem) {
    return array.map((item, i) => {
        if (i !== index) {
            return item
        }

        return {
            ...item,
            ...newItem
        }
    })
}

// Reference: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
/**
 * Remove an item from an immutable array.
 *
 * @param {Array} array 
 * @param {number} index 
 */
export function removeItem(array, index) {
    return array.filter((_, i) => i !== index)
}