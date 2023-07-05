import React, { useEffect, useState } from 'react';

const NumberManagementService = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      const urls = [
        
        
   'http://104.211.219.98/numbers/primes',
   'http://104.211.219.98/numbers/fibo',
      
        
      ];

      try {
        const responses = await Promise.all(
          urls.map(url => fetch(url).then(response => response.json()))
        );

        const mergedNumbers = responses
          .flatMap(response => response.numbers)
          .filter((number, index, array) => array.indexOf(number) === index)
          .sort((a, b) => a - b);

        setNumbers(mergedNumbers);
      } catch (error) {
        console.log('Failed to fetch numbers:', error.message);
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div>
      <h2>Number Management Service</h2>
      <p>Numbers: {numbers.join(', ')}</p>
    </div>
  );
};

export default NumberManagementService;
