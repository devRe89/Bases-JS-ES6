




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
            console.log(i);
            console.log(sieve[i])
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                // console.log(j);
                sieve[j] = true;
                console.log(sieve[j]);
            }
        }
    }
    return primes;
}

function isPrime(num) {
    if(num < 2) return false;
    for (var i = 2; i < num; i++) {
        if(num%i==0)
            return false;
    }
    return true;
}

let primos = [];
for(var i = 0; i < 10000; i++){
    if(isPrime(i)) {
        primos.push(i);
    }
}


JSON.stringify(console.log(primos),null,'\t')

console.time();
// console.log(getPrimes(100));
// console.log(4 << 1); // 1360
console.timeEnd();

/*
https://stackoverflow.com/questions/11966520/how-to-find-prime-numbers-between-0-100

*/