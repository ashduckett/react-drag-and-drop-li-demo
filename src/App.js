
import ItemList from './ItemList';

function App() {
  const listItems = [
    {
      id: 1,
      text: 'Item 1'
    },
    {
      id: 2,
      text: 'Item 2'
    },
    {
      id: 3,
      text: 'Item 3'
    },
  ];
  
  
  return (
    <div className="App">
      <ItemList items={listItems} />
    </div>
  );
}

export default App;
