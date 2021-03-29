import React from 'react'
import axios from 'axios'

const Testapi = () => {
    const [todo, setTodo] = React.useState([]);

    React.useEffect(() => {
        // console.log('did mount');
        fetchTodoTask();
    }, []);

    async function fetchTodoTask(){
        await axios.get("http://localhost:1000/api/tasks?isFinished=false").then(res => setTodo(res.data));
        // let res = await axios.get("http://localhost:1000/api/tasks?isFinished=false");
        // console.log(res.data);
    }

    return <div>
            <div>
                <h1>Todo</h1>
                <ul>
                    {todo.map((task) => <li>
                        <span>{task.taskName} </span>
                        <span>{task.isFinish} </span>
                        <span>{task.time} </span>
                    </li>)}
                </ul>
            </div>
        </div>;
};

export default Testapi;