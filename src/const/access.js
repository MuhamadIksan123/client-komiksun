export const accessHome = {
  lihat: ['admin', 'vendor', 'customer'],
  tambah: ['admin', 'vendor', 'customer'],
  edit: ['admin', 'vendor', 'customer'],
  hapus: ['admin', 'vendor', 'customer'],
};

export const accessUser = {
  lihat: ['admin'],
  tambah: ['admin'],
  edit: ['admin'],
  hapus: ['admin'],
  detail: ['admin'],
  status: ['admin'],
};

export const accessGenre = {
  lihat: ['admin'],
  tambah: ['admin'],
  edit: ['admin'],
  hapus: ['admin'],
};

export const accessKomik = {
  lihat: ['vendor', 'admin'],
  tambah: ['vendor'],
  edit: ['vendor'],
  hapus: ['vendor'],
  detail: ['vendor', 'admin'],
  status: ['admin'],
};

export const accessChapter = {
  lihat: ['vendor', 'admin'],
  tambah: ['vendor'],
  edit: ['vendor'],
  hapus: ['vendor'],
  status: ['admin'],
};
export const accessPayment = {
  lihat: ['vendor'],
  tambah: ['vendor'],
  edit: ['vendor'],
  hapus: ['vendor'],
};

export const accessTransaksi = {
  lihat: ['admin', 'vendor', 'customer'],
  status: ['admin'],
  detail: ['admin', 'vendor'],
};

export const accessContact = {
  lihat: ['admin'],
  hapus: ['admin'],
  detail: ['admin', 'vendor'],
};
