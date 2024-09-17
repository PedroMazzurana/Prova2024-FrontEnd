import { useState, useEffect } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import { updateVeiculo, getVeiculo } from '../services/veiculoService';

// Definir o tipo para o acessório e o veículo
interface Acessorio {
  nome: string;
}

interface Veiculo {
  modelo: string;
  anoFabricacao: string;
  placa: string;
  acessorios: Acessorio[];
}

const VeiculoFormEdit = ({ veiculoId, onUpdate }: { veiculoId: string; onUpdate: () => void }) => {
  const [veiculo, setVeiculo] = useState<Veiculo>({ modelo: '', anoFabricacao: '', placa: '', acessorios: [] });
  const [novoAcessorio, setNovoAcessorio] = useState('');

  useEffect(() => {
    // Buscar os dados do veículo para preencher o formulário
    const fetchVeiculo = async () => {
      const response = await getVeiculo(veiculoId);
      setVeiculo(response.data);
    };

    fetchVeiculo();
  }, [veiculoId]);

  const handleSubmit = async () => {
    await updateVeiculo(veiculoId, veiculo);
    onUpdate();
  };

  const addAcessorio = () => {
    if (novoAcessorio) {
      setVeiculo({
        ...veiculo,
        acessorios: [...veiculo.acessorios, { nome: novoAcessorio }],
      });
      setNovoAcessorio(''); // Limpa o campo do acessório após adicionar
    }
  };

  const removeAcessorio = (index: number) => {
    const updatedAcessorios = veiculo.acessorios.filter((_, i) => i !== index);
    setVeiculo({ ...veiculo, acessorios: updatedAcessorios });
  };

  return (
    <Box>
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

      <Box mb={3}>
        <h3>Acessórios:</h3>
        {veiculo.acessorios.map((acessorio, index) => (
          <Box key={index}>
            {acessorio.nome}
            <Button ml={2} colorScheme="red" size="xs" onClick={() => removeAcessorio(index)}>
              Remover
            </Button>
          </Box>
        ))}

        <Input
          placeholder="Novo Acessório"
          value={novoAcessorio}
          onChange={(e) => setNovoAcessorio(e.target.value)}
          mb={2}
        />
        <Button onClick={addAcessorio} colorScheme="blue" size="sm">
          Adicionar Acessório
        </Button>
      </Box>

      <Button onClick={handleSubmit} colorScheme="blue">
        Atualizar Veículo
      </Button>
    </Box>
  );
};

export default VeiculoFormEdit;
