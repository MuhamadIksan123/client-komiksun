import axios from 'axios';
import handleError from './handleError';
import { config } from '../configs';

export async function getData(url, params) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};

    const res = await axios.get(`${config.api_host_dev}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (err) {
    console.log('ERROR');
    console.log(err);
    return handleError(err);
  }
}

export async function getBlob(url, params) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const res = await axios
      .get(`${config.api_host_dev}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      })
      .then((response) => {
        // Logika untuk menangani respons yang Berhasil
        console.log(response.data);
        const blob = response.data; // Mengakses objek Blob dari respons
        // Contoh tindakan:
        // 1. Menyimpan objek Blob ke sistem file lokal
        const filename = 'file.pdf';
        saveBlobToFile(blob, filename);
      })
      .catch((error) => {
        // Tangani kesalahan yang terjadi
        console.log('ERROR 1');
        console.error(error);
      });
    console.log(res);
    // return res;
  } catch (err) {
    console.log('ERROR');
    return handleError(err);
  }
}

function saveBlobToFile(blob, filename) {
  // Membuat objek URL untuk Blob
  const blobURL = URL.createObjectURL(blob);

  // Membuat elemen <a> yang tidak terlihat
  const link = document.createElement('a');
  link.href = blobURL;
  link.download = filename;

  // Mengeklik elemen <a> untuk memulai unduhan
  link.click();

  // Membersihkan objek URL setelah unduhan selesai
  URL.revokeObjectURL(blobURL);
}

export async function postData(url, payload, formData) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};

    const res = await axios.post(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
      },
    });

    return res;
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
}

export async function putData(url, payload) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};

    const res = await axios.put(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteData(url) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};

    const res = await axios.delete(`${config.api_host_dev}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (err) {
    return handleError(err);
  }
}

export async function downloadData(url, params) {
  try {
    const res = await axios.get(`${config.api_host_dev}${url}`, {
      params,
    });

    return res;
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
}
