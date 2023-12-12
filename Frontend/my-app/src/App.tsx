import './App.scss'
import { Button } from 'react-bootstrap'
import MyList from './components/MyList'
import Axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState();

  const getData = async() => {
    const response = await Axios.get("http://localhost:3000/getData");
    setData(response.data);
  }

  useEffect(() => {
    getData()
  },[])
  return (
    <div>{data}</div>
    // <>
    //   <div className='p-4 m-3 rounded' style={{backgroundColor: "#DDF2FD"}}>
    //     <h1 className='text-primary' style={{paddingBlock:"1rem", color: ""}}>
    //       My Todo List
    //     </h1>
    //     <div className='d-flex gap-4 justify-content-center'>
    //     <input type="text" className="form-control w-50" placeholder="Please enter a todo item..."></input>
    //     <Button className='btn btn-primary'>Add</Button>
    //     </div>

    //     <div className='justify-content-center'>
    //       <MyList/>
    //     </div>
        
    //   </div>
    // </>
  )
}

export default App
