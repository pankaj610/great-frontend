/**
 * @param {Object} obj
 * @return {Object}
 */
export default function squashObject(obj, depth = 1, keyTillNow = "") {
    let finalObj = {};
  for(let key in obj) {
    let k = keyTillNow && key ? keyTillNow + '.' : keyTillNow;
    
    if(typeof obj[key] === 'object' && obj[key] !== null) {
        finalObj = { ...finalObj, ...squashObject(obj[key], depth + 1, k + key)};
    } else if(Array.isArray(obj[key])) {
        for(let i in obj[key]) {
            finalObj = { ...finalObj, ...squashObject(obj[key][i], depth + 1, k + '.' + i + '.' + key)};
        }
    } else { 
        finalObj[k + key] = obj[key];
    }
  }
  return finalObj;
}

--- Best----


/**
 * @param {Object} obj
 * @return {Object}
 */
export default function squashObject(obj, path = [], output={}) {
    for(const [key, value] of Object.entries(obj)) {
        if(typeof value !== 'object' || value === null) {
            output[path.concat(key).filter(Boolean).join('.')] = value;
        } else {
            squashObject(value, path.concat(key), output);
        }
    }
  return output;
}



---- Alternative ----


