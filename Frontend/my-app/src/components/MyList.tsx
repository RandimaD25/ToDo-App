import { Button } from 'react-bootstrap'
import React, {useState} from 'react';
import { deleteItems } from '../services/deleteItem';

interface DeleteItemProps {
    todo: TodoType;
    onRemoveTodo: (todoID:number) => void;
  }

const MyList: React.FC<DeleteItemProps> = ({todo, onRemoveTodo}) => {
    // const [deleteItems, setDelteItems] = useState<boolean>(false);

    const onDelete = () => {
        onRemoveTodo(todo.id);
    }

    return (
        <ul id='list'>
            <li
                className='align-items-left' 
                style={{marginInline: "15rem"}}>
                <div className='d-flex mt-4 gap-4' style={{display:"flex", justifyContent: "space-between"}}>
                {todo.description}
                    <div className='d-flex gap-4 align-items-right'>
                        <Button className='btn btn-success'>Done</Button>
                        <Button onClick={onDelete} className='btn btn-danger'>Delete</Button>
                    </div>
                </div>  
            </li>  
        </ul>    
    )
}

export default MyList;

