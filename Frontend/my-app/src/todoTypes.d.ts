interface TodoType{
    id: number,
    description: string,
    flag: boolean
}

type RemoveTodo = (todoToRemove: TodoType) => void;

// type Option = {
//     value: string,
//     onClick: () => void
// }