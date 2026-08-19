import axios from 'axios';

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return 'La solicitud tardó demasiado. Intenta de nuevo.';
    }

    if (!error.response) {
      return 'Sin conexión. Revisa tu red e intenta de nuevo.';
    }

    if (error.response.status >= 500) {
      return 'El servicio no está disponible por ahora.';
    }
  }

  return 'No pudimos cargar tus cuentas. Intenta de nuevo.';
}
