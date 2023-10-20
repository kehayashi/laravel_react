import './App.css';

//boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponent from './components/Navbar';
import CardComponent from './components/Card';

function App() {

  return (
    <div className="App">
      <NavBarComponent/>
      <CardComponent
        cardHeader='Filtros' 
        cardTitle='Defina os parametros para facilitar sua busca'
      />
    </div>
  );
}

export default App;
