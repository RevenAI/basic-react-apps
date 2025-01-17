import { useState, useEffect } from "react";
import Form from './Form';
import Table from './Table';
//import List from './List';

function App() {
   const [reqType, setReqType] = useState('');
   const [items, setItems] = useState([]);

   useEffect(() => {
      const API_URL = 'https://jsonplaceholder.typicode.com/';

      const fetchItems = async () => {
        const url = `${ API_URL }${ reqType }`;
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Error fetching data');
          const data = await response.json();
          setItems(data);
        } catch (err) {
          console.error(err.message);
        }
      }
      fetchItems();
   }, [reqType]);

  return (
    <div className="App">
       <Form
       reqType={reqType}
       setReqType={setReqType}
       />
       {/* <List items={items}/> */}
       <Table items={items}/>
    </div>
  );
}

export default App;
