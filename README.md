# check-redirects
## Uso (Español)

Este script se utiliza para verificar y validar redirecciones web en tu proyecto. Sigue los pasos a continuación para usarlo:

### Requisitos previos
- Asegúrate de tener Node.js instalado en tu sistema.
- Instala las dependencias necesarias ejecutando:
  npm install
- Debes tenes un archivo .csv (redirects.csv) con dos columnas URL Origen y URL Destino que cuenten con los redirects a checkear
- El archivo redirects.csv debe estar en la misma ruta donde se encuentra el script


### Ejecución del Script
1. Navega al directorio que contiene el script:

2. Ejecuta el script usando el siguiente comando:
   node check_redirects.js
   

### Salida
- El script entrega un redirect_results.xlsx con el estado de cada redirección, indicando si es válida o está rota.


------------------------------------------------------------------------------------------------

