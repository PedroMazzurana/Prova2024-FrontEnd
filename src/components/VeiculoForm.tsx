import { useState } from 'react';
import { Box, Input, Button, Checkbox, Stack, Heading } from '@chakra-ui/react';
import { createVeiculo } from '../services/veiculoService';

// Definir a interface do acessório
interface Acessorio {
  nome: string;
}

// Definir a interface do veículo
interface Veiculo {
  modelo: string;
  anoFabricacao: string;
  placa: string;
  acessorios: Acessorio[];
}

const VeiculoForm = ({ onAdd }: { onAdd: () => void }) => {
  const [veiculo, setVeiculo] = useState<Veiculo>({ modelo: '', anoFabricacao: '', placa: '', acessorios: [] });
  const [adicionarAcessorio, setAdicionarAcessorio] = useState(false);
  const [novoAcessorio, setNovoAcessorio] = useState('');

  const handleSubmit = async () => {
    let veiculoAtualizado = { ...veiculo };

    // Adicionar o acessório ao veículo se o checkbox estiver marcado
    if (adicionarAcessorio && novoAcessorio) {
      veiculoAtualizado.acessorios = [...veiculo.acessorios, { nome: novoAcessorio }];
    }

    // Enviar o veículo atualizado ao backend
    await createVeiculo(veiculoAtualizado);

    // Resetar o formulário e os estados
    onAdd();
    setVeiculo({ modelo: '', anoFabricacao: '', placa: '', acessorios: [] });
    setAdicionarAcessorio(false);
    setNovoAcessorio('');
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      backgroundColor="gray.50"
    >
      <Box 
        width="400px" 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        padding="6" 
        backgroundColor="white" 
        boxShadow="lg"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={5}>
          Adicionar Veículo
        </Heading>

        <Stack spacing={4}>
          <Input
            placeholder="Modelo"
            value={veiculo.modelo}
            onChange={(e) => setVeiculo({ ...veiculo, modelo: e.target.value })}
            mb={3}
          />
          <Input
            placeholder="Ano de Fabricação"
            type="number"
            value={veiculo.anoFabricacao || ''}
            onChange={(e) => setVeiculo({ ...veiculo, anoFabricacao: e.target.value })}
            mb={3}
          />
          <Input
            placeholder="Placa"
            value={veiculo.placa}
            onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value })}
            mb={3}
          />

          {/* Checkbox para adicionar um acessório */}
          <Checkbox
            isChecked={adicionarAcessorio}
            onChange={() => setAdicionarAcessorio(!adicionarAcessorio)}
          >
            Adicionar Acessório?
          </Checkbox>

          {/* Se o checkbox for marcado, exibir o campo para adicionar um acessório */}
          {adicionarAcessorio && (
            <Input
              placeholder="Nome do Acessório"
              value={novoAcessorio}
              onChange={(e) => setNovoAcessorio(e.target.value)}
              mb={3}
            />
          )}

          <Button 
            onClick={handleSubmit} 
            colorScheme="blue" 
            width="full" 
            mt={4} 
          >
            Adicionar Veículo
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default VeiculoForm;
