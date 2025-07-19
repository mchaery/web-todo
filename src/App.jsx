import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './lib/supabase';

// [{
//   id: String,
//   test: String,
//   completed: Boolean
// }]

function App() {
  const [todos, setTodos] = useState([]);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []); //param1: 실행시키고자하는 함수, param2: 언제 실행시킬건지

  const fetchTodos = async () => {
    try {
      let { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      setTodos(todos || []);

    } catch (error) {
      console.log(error);
    }
  }

  // input에 텍스트 입력 (완)
  // 추가 버튼 클릭 (완)
  // input에 있는 텍스트가 setTodos 통해 todos 값에 추가

  // -- todo 추가 함수 --
  const addTodo = async (e) => {
    e.preventDefault(); // 새로고침 막음

    try {
      const { data } = await supabase
        .from('todos')
        .insert([
          { text: inputValue },
        ])
        .select()

      //console.log(data)

      if (data && data.length > 0) {
        setTodos([data[0], ...todos]);
      }

    } catch (error) {

    }

    // const newTodo = { //새로운 객체
    //   id: Date.now().toString(),
    //   text: inputValue,
    //   completed: false
    // };
    setTodos([newTodo, ...todos]); // ... = spread 연산자
    // 기존 배열에 push하는게 아니라 새로운 배열 만들어서 todos 추가
    setInputValue('') //추가 버튼 누르면 값 사라지도록
    console.log(todos);
  };

  // -- todo 체크박스 클릭 함수 --
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;


      const { data, error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id)
        .select()

      if (data && data.length > 0) {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
            // 배열 돌면서 id값 일치하는 요소만 새로운 값으로 바꾼 새로운 배열 만든다
          )
        );
      }
    } catch (error) {
      console.log(error);
    }

  };

  // -- todo 삭제 함수 --
  const deleteTodo = async (id) => {
    try {
      //console.log(id)
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) {
        console.log(error);
        return;
      }
      setTodos(
        todos.filter((todo) => todo.id !== id));
      // filter 함수로 조건 일치하는 요소들로만 새로운 배열

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="app">
        <div className="todo-container">
          <header className='header'>
            <h1>˚ ₊‧♡ To-do List ♡‧₊ ˚</h1>
            <p className='subtitle'>일정을 체계적으로 관리하세요</p>
          </header>
          <form className="input-form" onSubmit={addTodo}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} //e = event
              placeholder="새로운 할 일을 입력하세요..."
              className="todo-input"
            />
            <button type="submit" className="add-button">
              추가
            </button>
          </form>

          <div className='todo-list'>
            {
              todos.length === 0 ? (
                <div className='empty-state'>
                  아직 할 일이 없습니다.
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    className={`todo-item ${todo.completed ? 'completed' : ''}`}
                  >
                    <label className='todo-checkbox'>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <span className="todo-text">{todo.text}</span>
                    <button
                      className="delete-button"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      x
                    </button>
                  </div>
                ))
              )
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default App
