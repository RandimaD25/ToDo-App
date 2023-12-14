import { Button } from 'react-bootstrap'
import React, {useState} from 'react';
import { deleteItems } from '../services/deleteItem';



interface Props {
    todo: TodoType
    // onDelete: (todoId: number) => void;
}

const MyList: React.FC<Props> = ({todo}) => {
    const [todoItems, setTodoItems] = useState<Array<TodoType>>([]);
    // const handleDeleteItem = () => {
    //     onDelete(todo.id)
    // }
    const handleDeleteItem = async (todoId: number) => {
        try {
            await deleteItems(todoId);
            setTodoItems((prevItems) =>
                prevItems.filter((item) => item.id !== todoId)
            );
            console.log("Item deleted successfully");
        } catch (error: any) {
            console.log("Delete item error:", error.message);
            
        }
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
                        <Button className='btn btn-danger'>Delete</Button>
                    </div>
                </div>  
            </li>  
        </ul>    
    )
}

export default MyList;

