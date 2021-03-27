import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
  const history = useHistory()
  const [name,setName] = useState("")
  const [password,setPasword] = useState("")
  const [email,setEmail] = useState("")
  
  
  const PostData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Invalid email",classes:"#f44336 red"})
      return
    }
    fetch("http://localhost:5000/",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      if (data.error){
        M.toast({html: data.error, classes:"#f44336 red"})
      }
      else{
        M.toast({html:data.message, classes:"#64dd17 light-green accent-4"})
        history.push('/signin')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="home-aligner">
            <div className="card authcard">
                <h2>Signup</h2>
                <input type="text" placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input type="text" placeholder="Email ID"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password"
                value={password}
                onChange={(e)=>setPasword(e.target.value)}
                />
                <br></br><br></br>
                <button className="btn waves-effect waves-light" onClick={()=>PostData()}>Submit</button>
                <br></br><br></br>
                <Link to="/signin">Signin instead?</Link>
            </div>
        </div>
  )
}

export default Signup
