import React from 'react'
import axios from 'axios'

const Testapi = () => {
    const [todo, setTodo] = React.useState([]);
    const [done, setDone] = React.useState([]);
    const [createInput, setCreateInput] = React.useState("");
    const [createTime, setCreateTime] = React.useState("");

    React.useEffect(() => {
        // console.log('did mount');
        fetchTodoTask();
        fetchDoneTask();
    }, []);

    async function fetchTodoTask(){
        await axios.get("http://localhost:1000/api/tasks?isFinished=false").then(res => setTodo(res.data));
        // let res = await axios.get("http://localhost:1000/api/tasks?isFinished=false");
        // console.log(res.data);
    }

    async function fetchDoneTask(){
        await axios.get("http://localhost:1000/api/tasks?isFinished=true").then(res => setDone(res.data));
        // let res = await axios.get("http://localhost:1000/api/tasks?isFinished=false");
        // console.log(res.data);
    }

    function onCreate(){
        // console.log(createInput, createTime)
        axios.post("http://localhost:1000/api/task", 
        {
            taskName: createInput,
            time: createTime,
        }
        ).then(() => {
            setCreateInput("");
            setCreateTime("");
            fetchTodoTask();
        })
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
            <div>
                <h1>Done</h1>
                <ul>
                    {done.map((dtask) => <li>
                        <span>{dtask.taskName} </span>
                        <span>{dtask.isFinish} </span>
                        <span>{dtask.time} </span>
                    </li>)}
                </ul>
            </div>
            <div>
                <h1>Create</h1>
                <input value={createInput} onChange={(e) => 
                    setCreateInput(e.target.value)
                    // console.log(e)
                    } />
                <input value={createTime} type="time" 
                    onChange={(e) =>
                    setCreateTime(e.target.value)
                    }
                />
                <button onClick={() => onCreate()}>Create Task</button>
            </div>
        </div>;
};

export default Testapi;