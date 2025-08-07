class DonasiResponse {
  id: string | null;
  order_id: string | null;
  tanggal_donasi: Date;
  nominal: number;
  deskripsi: string;
  gambar: string | null;
  created_at: Date;
  updated_at: Date;
  id_user: string;

  constructor(
    id: string | null,
    order_id: string | null,
    id_user: string,
    tanggal_donasi: Date,
    nominal: number,
    gambar: string | null,
    deskripsi: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.order_id = order_id;
    this.id_user = id_user;
    this.tanggal_donasi = tanggal_donasi;
    this.nominal = nominal;
    this.gambar = gambar;
    this.deskripsi = deskripsi;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default DonasiResponse;
