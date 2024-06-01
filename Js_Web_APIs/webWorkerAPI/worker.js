// Function to calculate factorial of a number
function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
  
  // Listen for messages from the main thread; message sent using worker.postMessage(number);
  onmessage = function(event) {
    const number = parseInt(event.data);
  
    // Perform the factorial calculation
    const result = factorial(number);
  
    // Post the result back to the main thread; sent the result to worker.onmessage
    postMessage(result);
  };
  