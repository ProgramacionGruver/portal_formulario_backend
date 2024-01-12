export const generarTemplateEvento = ( data ) => {
    return `
    <div align="center" >
        <img src="${data.imgInvt}"  width="550" height="800">
    </div>
`
}

export const generarHtmlEvento = ( data ) => {
    return `
    <title>Información de Acceso</title>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
<div>

</div>
<table cellpadding="0" cellspacing="0" width="100%" style="background-color: #fff; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  <tr>
      <td  style="padding: 20px;">
        <div align="left">

        </div>
        <div align="center">
          <h2 style="color: #1052A0; margin-bottom: 0.3rem;"><strong>Gruver</strong> te invitan a vivir ${data.eventoObj.titulo}.</h2>
          <div style="color: #1052A0;"> <strong>CÓDIGO DE CONFIRMACIÓN</strong></div>
          
          <p style="margin-bottom: 0;"> <strong> ${ new Date(data.eventoObj.fechaInicio ).toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })} </strong></p>
          <img src="${data.urlQr}"  width="300" height="300">

          <div align>
            <p><strong>Nombre:</strong> ${data.nombre} ${data.apellidos} </p>
            <p><strong>Empresa:</strong> ${data.empresa}</p>
            <p>Por favor, guarda esta información en un lugar seguro.</p>
          </div>
          <p>Gracias y bienvenido.</p>
          
        </div>
      </td>
  </tr>
</table>

</body>`
}