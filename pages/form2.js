// Componente para descargar
export default function DownloadButton() {
    
    const handleDownload = async () => {
      try {
        const response = await fetch('/api/form2')
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'backup-full-database.json'
        a.click()
      } catch (error) {
        console.error('Error descargando:', error)
      }
    }
  
    return (
      <button onClick={handleDownload}>
        Enviar
      </button>
    );
  }