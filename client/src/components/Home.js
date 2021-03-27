import React, {useState, useContext, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const Home = () => {
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    const [data, setData] = useState([])
    useEffect(()=>{
            fetch('http://localhost:5000/home',{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                setData(result.posts)
            })
    },[])
    return (
        <div className="home-aligner">
            {
                data.map(item=>{
                    return(
                        <div className="home-card" style={{textAlign:"center"}}>
                            <u style={{color:"red"}}><h4>{item.title}</h4></u>
                            <br/>
                            <h6 style={{ textAlign:"right"}}>Posted By: {item.postedBy.name}</h6>
                            <br/><br/>
                            <p>
                            {item.body}
                            </p>
                            <br/><br/>
                            <button style={{fontFamily:"'Lexend', sans-serif"}} className="btn waves-effect waves-light">View this Thread</button>
                        </div>
                    )
                })
            
            
            }
        </div>
    )
}

export default Home
