import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import SelectComponent from './Select';
import ButtonComponent from './Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const CardComponent = ({
  cardHeader,
  cardTitle,
  cardText,
}) => {

  /**
   * Consts declaradas para o gerenciamento de estados com o hook useState
   */
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicle, setVehicle] = useState(null)

  /**
   * Consts declaradas com a urlbase
   */
  const url = 'https://parallelum.com.br/fipe/api/v1';

  /**
   * Function para setar os selects quando o selectoption do tipo de veiculo for alterado
   * @param string selectedOption value do select tipo de veiculos
   * @function fetchBrands função para buscar as marcas com o tipo de veiculo
   */
  const handleVehicleTypeChange = (selectedOption) => {
    setSelectedVehicleType(selectedOption);
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setCurrentStep(2);
    fetchBrands(selectedOption);
  };

  /**
   * Function para buscar as marcas de acordo com o tipo de veiculo
   * @param string vehicleType value do select tipo de veiculos
   * @function fetch requisicao para endpoint da API 
   * @function setBrand seta o resultado da requisicao em brand
   */
  const fetchBrands = (vehicleType) => {
    if (vehicleType) {
      fetch(`${url}/${vehicleType.value}/marcas`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((item) => ({
            label: item.nome,
            value: item.codigo,
          }));
          setBrands(formattedData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /**
   * Function para buscar os modelos de acordo com o tipo de veiculo e marca
   * @param const brand com value do select marcas
   * @function fetch requisicao para endpoint da API 
   * @function setModels seta o resultado da requisicao em models
   */
  const fetchModels = () => {
    if (selectedVehicleType) {
      fetch(`${url}/${selectedVehicleType.value}/marcas/${selectedBrand.value}/modelos`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.modelos.map((item) => ({
            label: item.nome,
            value: item.codigo,
          }));
          setModels(formattedData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /**
   * Function para buscar os anos de acordo com o tipo de veiculo, marca e modelo
   * @function fetch requisicao para endpoint da API 
   * @function setYears seta o resultado da requisicao em vehicle
   */
  const fetchYear = () => {
    if (selectedVehicleType && selectedBrand && selectedModel) {
      fetch(`${url}/${selectedVehicleType.value}/marcas/${selectedBrand.value}/modelos/${selectedModel.value}/anos`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((item) => ({
            label: item.nome,
            value: item.codigo,
          }));
          setYears(formattedData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /**
   * Function para buscar o veiculos de acordo com o tipo de veiculo, marca, modelo e ano
   * @function fetch requisicao para endpoint da API 
   * @function setVehicle seta o resultado da requisicao em years
   */
  const fetchVehicle = () => {  
    if (selectedVehicleType && selectedBrand && selectedModel && selectedYear) {
      fetch(`${url}/${selectedVehicleType.value}/marcas/${selectedBrand.value}/modelos/${selectedModel.value}/anos/${selectedYear.value}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = {
            Valor: data.Valor,
            Marca: data.Marca,
            Modelo: data.Modelo,
            AnoModelo: data.AnoModelo,
            Combustivel: data.Combustivel,
            CodigoFipe: data.CodigoFipe,
            MesReferencia: data.MesReferencia,
            SiglaCombustivel: data.SiglaCombustivel,
          };

          setVehicle(formattedData);
        })
        .catch((error) => {
          console.error("Erro na chamada da API:", error);
        });
    }
  };

  /**
   * Function exportar a tabela criado para pdf
   */
  const exportToPDF = () => {
    const doc = new jsPDF();
    const table = document.getElementById('table-to-export');
  
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10);
      doc.save('tabela.pdf');
    });
  };

  /**
   * Function exportar a tabela criado para XLS
   */
  const exportToXLS = () => {
    const table = document.getElementById('table-to-export');
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'tabela.xlsx');
  };

  /**
   * Const para preencher o selectComponent de tipo de veiculos
   */
  const options = [
    { label: 'carros', value: 'carros' },
    { label: 'motos', value: 'motos' },
    { label: 'caminhoes', value: 'caminhoes' },
  ];

  return (
    <Container className="p-4">
      <Card>
        <Card.Header>{cardHeader}</Card.Header>
        <Card.Body>
          <Card.Title>{cardTitle}</Card.Title>
          {cardText}

          {/* dependendo do passo, mostra o elemento */}
          {currentStep >= 1 && (
            <SelectComponent
              name="veiculos"
              labelText="Tipo de Veículo:"
              options={options}
              onSelectionChange={handleVehicleTypeChange}
            />
          )}
          {currentStep >= 2 && (
            <SelectComponent
              name="marcas"
              labelText="Marca:"
              options={brands}
              selectedValue={selectedBrand}
              onSelectionChange={(brandOption) => { 
                setSelectedBrand(brandOption); // seta opcao selecionada
                setCurrentStep(3); // set o passo dos selects que se encontra 
                fetchModels(); //chama funcao de busca 
              }}
            />
          )}
          {currentStep >= 3 && (
            <SelectComponent
              name="modelos"
              labelText="Modelo:"
              options={models}
              selectedValue={selectedModel}
              onSelectionChange={(modelOption) => {
                setSelectedModel(modelOption); // seta opcao selecionada
                setCurrentStep(4); // set o passo dos selects que se encontra 
                fetchYear(); //chama funcao de busca
              }}
            />
          )}
          {currentStep >= 4 && (
            <SelectComponent
              name="anos"
              labelText="Ano:"
              options={years}
              selectedValue={selectedYear}
              onSelectionChange={(yearOption) => setSelectedYear(yearOption)}
            />
          )}

          {/* se todos os selects forem preenchidos, mostra o botao */}
          {selectedVehicleType && selectedBrand && selectedModel && selectedYear &&
            <ButtonComponent classColor="success" textButton="BUSCAR" onClick={fetchVehicle} />
          }
        </Card.Body>
      </Card>
      {vehicle && vehicle !== null && (
        <Table id="table-to-export" className="table">
          <thead>
            <tr>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Ano</th>
              <th scope="col">Combustível</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{vehicle.Marca}</td>
              <td>{vehicle.Modelo}</td>
              <td>{vehicle.AnoModelo}</td>
              <td>{vehicle.Combustivel}</td>
              <td>{vehicle.Valor}</td>
            </tr>
          </tbody>
        </Table>
      )}
      {vehicle && vehicle !== null && (
        <div>
          <ButtonComponent textButton="Exportar para PDF" classColor='info' onClick={exportToPDF}/>
          <ButtonComponent textButton="Exportar para XLS" classColor='primary' onClick={exportToXLS}/>
        </div>
      )}
    </Container>
  );
};

export default CardComponent;
