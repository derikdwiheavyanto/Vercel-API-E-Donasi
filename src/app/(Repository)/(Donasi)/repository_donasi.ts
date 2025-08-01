import { prisma } from "@/app/(DB)/database";
import DonasiRequest from "@/app/(Model)/(Request)/DonasiRequest";
import DonasiResponse from "@/app/(Model)/(Response)/DonasiResponse";

const getAllDonasiByUser = async (
  id: string
): Promise<DonasiResponse[] | null> => {
  const donasi = await prisma.donasi.findMany({
    where: {
      id_user: id,
    },
  });

  if (!donasi) {
    return null;
  }

  const result = await Promise.all(
    donasi.map(async (donasi) => {
      return new DonasiResponse(
        donasi.id,
        donasi.order_id,
        donasi.id_user,
        donasi.tanggal_donasi,
        donasi.nominal,
        donasi.deskripsi,
        donasi.created_at,
        donasi.updated_at
      );
    })
  );

  return result;
};

const createDonasi = async (donasi: DonasiRequest) => {
  return await prisma.donasi.create({
    data: {
      order_id: donasi.order_id,
      id_user: donasi.id_user,
      tanggal_donasi: donasi.tanggal_donasi,
      nominal: donasi.nominal,
      deskripsi: donasi.deskripsi,
    },
  });
};

const editDonasi = async (id: string, donasiRequest: DonasiRequest) => {
  const data: Record<string, string | number> = {};

  if (donasiRequest.nominal) {
    data.nominal = donasiRequest.nominal;
  }

  if (donasiRequest.deskripsi) {
    data.deskripsi = donasiRequest.deskripsi;
  }

  return await prisma.donasi.update({
    where: {
      id: id,
    },
    data,
  });
};

const findDonasiById = async (id: string) => {
  return await prisma.donasi.findUnique({
    where: {
      id: id,
    },
  });
};

const deleteDonasi = async (id: string) => {
  return await prisma.donasi.delete({
    where: {
      id: id,
    },
  });
};

const repositoryDonasi = {
  getAllDonasiByUser,
  createDonasi,
  editDonasi,
  findDonasiById,
  deleteDonasi,
};

export default repositoryDonasi;
