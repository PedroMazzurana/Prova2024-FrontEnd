import { ChakraProvider } from '@chakra-ui/react';
import VeiculoForm from './components/VeiculoForm';
import VeiculoList from './components/VeiculoList';


function App() {
  const refreshList = () => window.location.reload();

  return (
    <ChakraProvider>
      <VeiculoForm onAdd={refreshList} />
      <VeiculoList />
    </ChakraProvider>
  );
}

export default App;
