import { useState } from 'react';
import './App.css'

function App() {
  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [age,setAge] = useState();
  const performSubmit = async (e) => {
    e.preventDefault();
     const data = {
        firstName,
        lastName,
        age,
      }
    try {
     
      const response  = await fetch(`http://localhost:3000/api`,{
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data),

      })

      if(response.ok){
        console.log(`successfull information POSTed`)
      }
    }catch(err){
      console.error(`some error occured`,err)
    }
  }
 return(<>
 <h1>
  Please fill this form
  </h1>
  <main>
    <form onSubmit={performSubmit}>
    <label>First Name: </label>
    <input type='text' value={firstName}/>
    <br/>
    <label>Last Name: </label>
    <input type='text' value={lastName}/>
    <br/>
    <label>Age: </label>
    <input type='number' value={age}/>
    <br/>
    <button type='submit'>Sumbit</button>
    </form>
    </main>
    </>)
}

export default App;
