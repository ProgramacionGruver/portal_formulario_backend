export const generarHtmlCorreoNotificacion = (nombreSolicitante, puestoSolicitado, herramienta) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">
    </head>
    <style>
        html {
            box-sizing: border-box;
        }
        *, *::before, *::after {
            box-sizing: inherit;
        }
        body {
            font-family: 'Quicksand', sans-serif;
            background-color: #EBECF0;
            display: flex;
            height: 80vh;
            justify-content: center;
            align-items: center;
        }
        .contenedor-mensaje{
            background-color: #ffff;
            padding: 50px;
            border-radius: 5px;
        }
        .boton {
             font-weight: bold;
        }
        p span {
            font-weight: bold;
        }
    </style>
    <body>
        <center>
            <table  heigth="300" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
              <tr>
                <td style="padding:40px 0 40px;"align="center" valign="top" id="bodyCell">
                    <img src="http://www.gruver.mx/wp-content/uploads/2022/06/logogruver2022.png" alt="">
                    <h1>Buen dia, el colaborador ${ nombreSolicitante },</h1>
                    <p>levanto una requisición, solicitando la vacante de <span>${ puestoSolicitado }</span>,
                    por lo tanto se requiere que se le autorice un <span>${ herramienta }</span></p>
                    <p> para que dicha herramienta sea otorgada al nuevo colaborador.
                    </p>
              </tr>
            </table>
        </center>
    </body>
    </html>
    `
}