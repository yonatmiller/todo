
const { useSelector } = ReactRedux

export function PercentOfDoneTodos() {

    const todos = useSelector((state) => state.todos)
    const doneTodos = todos.filter(todo => todo.isDone)
    console.log(todos.length, doneTodos.length);
    
    const PercentOfDoneTodos = doneTodos.length/todos.length*100


    return(
        <div>Percent of done todos: {`${PercentOfDoneTodos}`}%</div>
    )
}