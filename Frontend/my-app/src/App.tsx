import './App.scss'
import { Button } from 'react-bootstrap'
import MyList from './components/MyList'
import { useEffect, useState } from 'react'
import { PostType } from './services/models/todo-interface'; //add
import { Post } from './services/api/api';

function App() {
	const [isCreate, setIsCreate] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [posts, setPosts] = useState<PostType[]>([]);
	const [isError, setIsError] = useState<boolean>(false);

	//add
  useEffect(() => {
		Post.getPosts()
			.then((data) => {
				setPosts(data);
			})
			.catch((err) => {
				setIsError(true);
			});
		return () => {};
	}, []);
  return (
    <>
      <div className='p-4 m-3 rounded' style={{backgroundColor: "#DDF2FD"}}>
        <h1 className='text-primary' style={{paddingBlock:"1rem", color: ""}}>
          My Todo List
        </h1>
        <div className='d-flex gap-4 justify-content-center'>
        <input type="text" className="form-control w-50" placeholder="Please enter a todo item..."></input>
        <Button className='btn btn-primary'>Add</Button>
        </div>

        <div className='justify-content-center'>
          <MyList/>
        </div>
        
      </div>
    </>
  )
}

export default App
