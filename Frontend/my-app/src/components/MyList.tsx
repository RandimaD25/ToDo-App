import { Button } from 'react-bootstrap'

interface TodoList {
    id: number;
    description: string;
    flag: boolean;
}

export default MyList;

function clickBtn(): void{
    console.log("Click Me"); 
}

const todoLists: TodoList[] = [
    { id: 1, description: "Start nodeJS tutorial.", flag: false },
    { id: 2, description: "Start React JS assignment 1.", flag: false },
    { id: 4, description: "Complete the exam paper question 1.", flag: false },
    { id: 5, description: "Complete the exam paper question 1.", flag: false },
    { id: 6, description: "Complete the exam paper question 1.", flag: false },
    { id: 7, description: "Complete the exam paper question 1.", flag: false },
]

const todoListItems = todoLists.map((todoList: TodoList) =>

    <li key={todoList.id} className='align-items-left' style={{marginInline: "15rem"}}>
        <div className='d-flex mt-4 gap-4' style={{display:"flex", justifyContent: "space-between"}}>
            {todoList.description}
            <div className='d-flex gap-4 align-items-right'>
                <Button className='btn btn-success' onClick={clickBtn}>Done</Button>
                <Button className='btn btn-danger'>Delete</Button>
            </div>
        </div>  
    </li>  
);

function MyList() {
    return (
        <>
           <ul>{todoListItems}</ul>
        </>
    )
}

<script>

</script>