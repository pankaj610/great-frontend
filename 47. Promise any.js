/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(iterable) {
    return new Promise((resolve, reject) => {
      let errors = new Array(iterable.length);
      let count = 0;
      if(iterable.length === 0) {
        return resolve(errors);
      }
      iterable.forEach(async (p, i)=> {
        try {
          let value = await p;
          resolve(value);
        } catch(err) {
          errors[i] = err;
          count++;
        }
        if(count === iterable.length) {
          reject(new AggregateError(errors));
        }
      })
    })
}
