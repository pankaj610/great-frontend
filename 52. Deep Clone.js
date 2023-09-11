export default function deepClone(value) {
  if(!value) return value; 

  if(Array.isArray(value)) {
    return value.map(el => deepClone(el));
  }
  if(typeof value === 'object') {
    let obj = {};
    for(const [key, value] of Object.entries(value)) {
      obj[key] = deepClone(value);
    }
    return obj;
  }
  return value;
}
