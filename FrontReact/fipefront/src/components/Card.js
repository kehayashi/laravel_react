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
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicle, setVehicle] = useState(null)

  const url = 'https://parallelum.com.br/fipe/api/v1';

  const handleVehicleTypeChange = (selectedOption) => {
    setSelectedVehicleType(selectedOption);
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setCurrentStep(2);
    fetchBrands(selectedOption);
  };

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

  const fetchModels = (brand) => {
    if (brand) {
      fetch(`${url}/${selectedVehicleType.value}/marcas/${brand.value}/modelos`)
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

  const handleSearch = () => {  
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

  const exportToPDF = () => {
    const doc = new jsPDF();
    const table = document.getElementById('table-to-export');
  
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10);
      doc.save('tabela.pdf');
    });
  };

  const exportToXLS = () => {
    const table = document.getElementById('table-to-export');
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'tabela.xlsx');
  };

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
                setSelectedBrand(brandOption);
                setCurrentStep(3);
                fetchModels(brandOption);
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
                setSelectedModel(modelOption);
                setCurrentStep(4);
                fetchYear();
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
          <ButtonComponent classColor="success" textButton="BUSCAR" onClick={handleSearch} />
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
