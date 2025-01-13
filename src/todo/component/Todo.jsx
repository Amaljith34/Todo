import axios from "axios";
import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [edit, setedit] = useState({
    name,
    age,
  });
  const [id, setId] = useState(null);
  const [ismodal, setModal] = useState(false);

  //fetch
  const fetchTodo = async () => {
    try {
      const datas = await axios.get("https://todo-server-acah.onrender.com/api/todo");
      setTodos(datas.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  //added
  const postData = async () => {
    try {
      const response = await axios.post("https://todo-server-acah.onrender.com/api/todo", {
        name,
        age,
      });
      console.log(response);

      if (response.data.success) {
        fetchTodo();
        alert("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = () => {
    postData();
  };
   //editedd
  const handleEdit = (item) => {
    setId(item._id);
    setedit(item);
    setModal(true);
  };
  const edited = async (id) => {
    try {
      const response = await axios.patch(
        `https://todo-server-acah.onrender.com/api/todo/${id}`,
        { name, age }
      );
      if (response.data.success) {
        alert("edited success");
        fetchTodo();
        setModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditSubmit = (id) => {
    edited(id);
  };
  const handleDelete = async (id) => {
    try {
        const response=await axios.delete(`https://todo-server-acah.onrender.com/api/todo/${id}`)
        if(response.data.success){
            alert('delete')
            fetchTodo()
        }
    } catch (error) {
        console.log(error);
        
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <form
        action=" "
        className="text-center    max-w-md p-6  rounded shadow-md border border-black bg-gray-300"
      >
        <h1 className="text-3xl font-bold ">Todo</h1>
        <div className=" space-y-4 block mt-10  items-center justify-center ">
          <label htmlFor="">
            Name :
            <input
              type="text"
              className="border border-black rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="" className="block ">
            Age:
            <input
              type="text"
              className="border border-black rounded-md"
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>
        <button
          className="bg-blue-500 px-4 py-1 mt-5 rounded-lg "
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      {/* <button className="" onClick={handleNavigate}>{`show >>`}</button> */}

      <div className="text-center  ml-10  max-w-md p-6  rounded shadow-md border border-black bg-gray-300">
        <ul>
          {todos.map((item) => {
            return (
              <li className=" mt-3" key={item._id}>
                <input className="" value={item.name} readOnly />
                <button
                  className="bg-green-500 px-2 py-1 rounded-md text-white"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="ml-4 bg-red-500 px-2 py-1 rounded-md text-white"
                  onClick={()=>handleDelete(item._id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        {ismodal && (
          <div className=" space-y-4 block mt-10  items-center justify-center ">
            <label htmlFor="">
              Name :
              <input
                type="text"
                defaultValue={edit.name}
                className="border border-black rounded-md"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="" className="block ">
              Age:
              <input
                type="text"
                defaultValue={edit.age}
                // value={edit.age}
                className="border border-black rounded-md"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <button
              className="bg-blue-500 px-2 py-1 rounded-md"
              onClick={() => handleEditSubmit(edit._id)}
            >
              submit
            </button>
            <button
              className="bg-green-500 px-2 py-1 rounded-md ml-5"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
