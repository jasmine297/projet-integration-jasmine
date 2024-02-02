import './App.css';
import React, { useState } from 'react';


function App() {
 
  // let [count, setCount] = useState(0);
  // const clickOnMe = () => {
  //   setCount(count+1);
  // }
  // return(
  // <>
  //   <button onClick={clickOnMe}>Click me</button>
  //   <span data-testid="count">{count}</span>
  // </>
  // )

  return(
    <>
      <form action="" method="get" class="form-example">
  <div class="form-example">
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required />
  </div>
  <div class="form-example">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="form-example">
    <input type="submit" value="Subscribe!" />
  </div>
</form>
    </>
  );

}

export default App;
