function isPrime(n) {
    for (let i = 2; i < n; i++){
        if (n % i == 0) {
            return 'Not a prime number'
        }      
    }
    return 'Your number is a prime number'
}
 
var result =  isPrime(101);
console.log(result);