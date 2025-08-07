class DonasiRequest {
  order_id: string = "";
  id_user: string = "";
  tanggal_donasi: Date = new Date();
  nominal: number = 0;
  deskripsi: string = "";
  gambar: string | null = null;
}

export default DonasiRequest;
