import { object, string, number, coerce, array } from "zod";

export const RoomSchema = object({
  name: string().min(1, { message: "Nama ruangan wajib diisi" }),
  description: string().min(50, { message: "Deskripsi minimal 50 karakter" }),
  capacity: coerce.number().gt(0, { message: "Kapasitas harus lebih dari 0" }),
  price: coerce.number().gt(0, { message: "Harga harus lebih dari 0" }),
  amenities: array(string()).nonempty({
    message: "Pilih minimal satu fasilitas",
  }),
});

export const ReserveSchema = object({
  name: string().min(1),
  phone: string().min(12),
 
});

export const ContactSchema = object({
  name: string().min(6, "Name at least 6 carachters"),
  email: string()
    .min(6, "Email at least 6 carachters")
    .email("Please enter a valid email"),
  subject: string().min(6, "Subject at least 6 carachters"),
  message: string()
    .min(50, "Message at least 50 carachters")
    .max(200, "Message at least 200 carachters"),
});

