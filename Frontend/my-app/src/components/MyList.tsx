import { Button } from 'react-bootstrap'

interface ItemProps {
    todo: TodoType;
    onRemoveTodo: (todoID:number) => void;
    onDoneTodo: (todoId: number) => void;
  }

const MyList: React.FC<ItemProps> = ({todo, onRemoveTodo, onDoneTodo}) => {

    const onDelete = () => {
        onRemoveTodo(todo.id);
    }

    const onDone = () => {
        console.log("done"); 
        onDoneTodo(todo.id);
    }

    return (
        <ul data-testid="todo-1" id='list'>
            <li
                className='align-items-left' 
                style={{marginInline: "15rem"}}>
                <div className='d-flex mt-4 gap-4' style={{display:"flex", justifyContent: "space-between"}}>
                {todo.description}
                    <div className='d-flex gap-4 align-items-right'>
                        <Button onClick={onDone} className='btn btn-success' hidden={todo.flag===true}>Done</Button>
                    
                        <Button onClick={onDelete} className='btn btn-danger'>Delete</Button>
                    </div>
                </div>  
            </li>  
        </ul>    
    )
}

export default MyList;

