import React,{useState,useEffect} from 'react';
function App() {
  const [name,setName] = useState();
  const [todos,setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [update,setupdate] = useState("");
  const SubmitHandler = (e) =>{
    e.preventDefault();
    setTodos([...todos,{id:Date.now(0),text:name,complete:0}]);
    setName("");
  }
  const EditHandler = (e) =>{
    e.preventDefault();
    const updateTodo = todos.filter((todo)=>todo.id !== update);
    const newupTO = [{id:update,text:name},...updateTodo];
    setTodos(newupTO);
  }
  const bindName = (e) =>{
    const name = e.target.value;
    setName(name);
  }
  const removeToDo = (id) =>{
    setTodos(todos.filter((todo)=>todo.id !== id));
  }
  const updateToDo = (id) =>{
    const upfield = todos.filter((todo)=>todo.id === id);
    setName(upfield[0].text);
    setupdate(upfield[0].id);
  }
  const completeToDo = (id) =>{
    const upfield = todos.filter((todo)=>todo.id === id);
    const upfield2 = todos.filter((todo)=>todo.id !== id);
    const complete = {
      id:upfield[0].id,
      text:upfield[0].text,
      complete:1
    }
    const updateTO = [complete,...upfield2];
    setTodos(updateTO);
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  return (
    <div className="container">
      <div className="row">
        <h3 className="text-center">Todo App</h3>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="login-panel panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Form</h3>
            </div>
            
            <div className="panel-body">
              <form onSubmit={((update !== "")?EditHandler:SubmitHandler)}>
                <fieldset>
                  <div className="form-group">
                    <input className="form-control" placeholder="List Name" value={((name !== undefined)?name:"")}  name="name" type="text" onChange={bindName} required/>
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Add Info" className="btn btn-success"/>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Action</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
            {
              todos.map(to=>(
                ((to.complete === 0)?
                  <tr key={to.id}>
                    <td>
                      <a className="btn btn-danger btn-xs" onClick={()=>removeToDo(to.id)}>Delete</a>
                      <a className="btn btn-success btn-xs" onClick={()=>updateToDo(to.id)}>Update</a>
                      <a className="btn btn-primary btn-xs" onClick={()=>completeToDo(to.id)}>Complete</a>
                    </td>
                    <td>{to.text}</td>
                  </tr>
                :"")
                )
              )
            }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
