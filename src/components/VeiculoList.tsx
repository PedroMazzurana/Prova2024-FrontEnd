import { useEffect, useState } from 'react';
import { getVeiculos, deleteVeiculo } from '../services/veiculoService';
import { Box, Button, Text } from '@chakra-ui/react';
import VeiculoFormEdit from './VeiculoFormEdit';

const VeiculoList = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [editingVeiculoId, setEditingVeiculoId] = useState<string | null>(null);

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    const response = await getVeiculos();
    setVeiculos(response.data);
  };

  const handleDelete = async (id: string) => {
    await deleteVeiculo(id);
    fetchVeiculos();
  };

  const handleEditClick = (id: string) => {
    setEditingVeiculoId(id);
  };

  const handleUpdate = () => {
    fetchVeiculos();
    setEditingVeiculoId(null); // Fecha o formulário de edição após a atualização
  };

  return (
    <Box>
      {veiculos.map((veiculo: any) => (
        <Box key={veiculo._id} border="1px solid" p="4" my="2">
          <h2>{veiculo.modelo}</h2>
          <p>Ano de Fabricação: {veiculo.anoFabricacao}</p>
          <p>Placa: {veiculo.placa}</p>

          <Box mb={2}>
            <h3>Acessórios:</h3>
            {veiculo.acessorios.length > 0 ? (
              veiculo.acessorios.map((acessorio: any, index: number) => (
                <Text key={index}>- {acessorio.nome}</Text>
              ))
            ) : (
              <Text>Nenhum acessório adicionado.</Text>
            )}
          </Box>

          <Button onClick={() => handleDelete(veiculo._id)} colorScheme="red">
            Deletar
          </Button>
          <Button onClick={() => handleEditClick(veiculo._id)} colorScheme="blue" ml={2}>
            Editar
          </Button>

          {editingVeiculoId === veiculo._id && (
            <VeiculoFormEdit veiculoId={veiculo._id} onUpdate={handleUpdate} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default VeiculoList;
