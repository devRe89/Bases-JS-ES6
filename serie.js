




const a = top => {
    let i = top;
    while (i >= 0) {
      console.log(i)  
      i--;     
    }
}

const b = top => {
    let i = 0;
    while (i <= top) {
      console.log(i)  
      i++;     
    }
}

function getPrimes(max) {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                console.log(j);
                sieve[j] = true;
            }
        }
    }
    return primes;
}

console.time();
console.log(getPrimes(100));
// console.log(4 << 1); // 1360
console.timeEnd();