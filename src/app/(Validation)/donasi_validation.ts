import Joi from "joi";

export const createDonasiValidation = Joi.object({
  nominal: Joi.number().required().positive().min(1000).messages({
    "number.base": "Nominal harus berupa angka",
    "number.positive": "Nominal harus lebih besar dari 0",
    "number.min": "Nominal minimal Rp1.000",
    "any.required": "Nominal wajib diisi",
  }),
  deskripsi: Joi.string().trim().min(5).max(200).required().messages({
    "string.base": "Deskripsi harus berupa teks",
    "string.empty": "Deskripsi tidak boleh kosong",
    "string.min": "Deskripsi minimal 5 karakter",
    "string.max": "Deskripsi maksimal 200 karakter",
    "any.required": "Deskripsi wajib diisi",
  }),
  gambar: Joi.string().required().messages({
    "any.required": "Gambar wajib diisi",
  }),
});

export const editDonasiValidation = Joi.object({
  nominal: Joi.number()
    .allow(null, 0)
    .optional()
    .positive()
    .min(1000)
    .messages({
      "number.base": "Nominal harus berupa angka",
      "number.positive": "Nominal harus lebih besar dari 0",
      "number.min": "Nominal minimal Rp1.000",
    }),
  deskripsi: Joi.string()
    .allow(null, "")
    .trim()
    .min(5)
    .max(200)
    .optional()
    .empty()
    .messages({
      "string.base": "Deskripsi harus berupa teks",
      "string.min": "Deskripsi minimal 5 karakter",
      "string.max": "Deskripsi maksimal 200 karakter",
    }),
});
