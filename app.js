const express = require('express');
const mysql = require('mysql2');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpass',
  database: 'node20_mysql'
});

// Route
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API!');
  });
  
// Detalle
app.get('/detalle', (req, res) => {
    const sql = 'SELECT * FROM descripciones';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          res.json(results);
        } else {
          res.send('Sin resultado');
        }
      });
});

app.get('/detalle/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM descripciones WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('Sin resultado');
      }
    });
});

app.post('/detalle/add', (req, res) => {
    const sql = 'INSERT INTO descripciones SET ?';

    const customerObj = {
    segmento: req.body.segmento,
    puerta: req.body.puerta,
    llantas: req.body.llantas,
    trammision: req.body.trammision,
    color: req.body.color,
    vidrios: req.body.vidrios,
    tapizado: req.body.tapizado,
    motor: req.body.motor,
    direccion: req.body.direccion
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Detalle creado!');
  });
});

app.put('/detalle/upd/:id', (req, res) => {
    const { id } = req.params;
    const { segmento, puerta,llantas,trammision,color,vidrios,tapizado,motor, direccion } = req.body;
    const sql = `UPDATE descripciones SET segmento='${segmento}',puerta='${puerta}',llantas='${llantas}',trammision='${trammision}',color='${color}',vidrios='${vidrios}',tapizado='${tapizado}',motor='${motor}',direccion='${direccion}' WHERE id =${id}`;
    
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Detalle modificado!');
      
    });
});

app.delete('/detalle/del/:id', (req, res) => {
    
    const { id } = req.params;
    const sql = `DELETE FROM descripciones WHERE id= ${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Detalle eliminado');
    });

});   


// Check connect
connection.connect(error => {
    if (error) throw error;
    console.log('Base de datos ejecutandose!');
  });
  
  app.listen(PORT, () => console.log(`Server en puerto ${PORT}`));
  