import DonasiRequest from "@/app/(Model)/(Request)/DonasiRequest";
import repositoryDonasi from "@/app/(Repository)/(Donasi)/repository_donasi";
import AppError from "@/lib/helper/app_error";

const getAllDonasiByUser = async (id: string) => {
  return await repositoryDonasi.getAllDonasiByUser(id);
};

const createDonasi = async (donasi: DonasiRequest) => {
  const today = new Date();
  donasi.tanggal_donasi = today;
  donasi.order_id = Math.random().toString(36).substring(2, 9);

  return await repositoryDonasi.createDonasi(donasi);
};

const _verifyUserDonasi = async (id_user: string, id_donasi: string) => {
  const findDonasi = await repositoryDonasi.findDonasiById(id_donasi);

  if (!findDonasi) {
    throw new AppError("donasi not found", 404);
  }

  if (findDonasi.id_user !== id_user) {
    throw new AppError(
      "Anda tidak memiliki akses untuk mengedit donasi ini.",
      401
    );
  }
};

const editDonasi = async (id_donasi: string, donasi: DonasiRequest) => {
  await _verifyUserDonasi(donasi.id_user, id_donasi);

  return await repositoryDonasi.editDonasi(id_donasi, donasi);
};

const deleteDonasi = async (id_donasi: string, id_user: string) => {
  await _verifyUserDonasi(id_user, id_donasi);

  return await repositoryDonasi.deleteDonasi(id_donasi);
};

const findDonasiById = async (id: string) => {
  const donasi = await repositoryDonasi.findDonasiById(id);
  return donasi;
};

const serviceDonasi = {
  getAllDonasiByUser,
  createDonasi,
  editDonasi,
  deleteDonasi,
  findDonasiById,
};

export default serviceDonasi;
