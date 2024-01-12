export const codificarBase64 = (texto) => {
  return btoa(encodeURIComponent(texto));
}

// Función para decodificar desde Base64
export const decodificarBase64 = (base64) => {
  // Reemplazar todas las '?' por '='
  const cadenaReemplazada = base64.replace(/\¿/g, '=')
  
  return decodeURIComponent(atob(cadenaReemplazada))
}