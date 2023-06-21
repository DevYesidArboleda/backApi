import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Container, Table } from "reactstrap";
import BotonExcelDefault from "../components/export/BotonExcelDefault";
import BotonExcelEstilizado from "../components/export/BotonExcelEstilizado";

import 'bootstrap/dist/css/bootstrap.css';

const ListExportPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/api/catalog_system/pub/products/search/")
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        let listaProductos = json.map((data) => {
          return {
            id: data.productId,
            nombre: data.productName,
            marca: data.brand,
            categoria: data.categories[0],
            cantidad: data.description,
            precio: data.items[0].sellers[0].commertialOffer.Price,
            reference: data.productReference,
          };
        });
        setProductos(listaProductos);
      });
  }, []);

  

  return (
    <Container className="pt-5">
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between">
            <CardTitle>Bandeja de Productos</CardTitle>
            <div>
              <BotonExcelDefault productos={productos} />
              <BotonExcelEstilizado productos={productos} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="scrolling">
          <Table bordered hover>
            <thead className="bg-primary text-white">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Categoria</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Codigo de referencia</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => {
                return (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.marca}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.reference}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ListExportPage;