import { z } from "zod";

const values = {
  maxZipCodeLength: 9,
  maxCpfLength: 14,
  maxStringLength: 255,
  minPasswordValue: 8,
  maxPasswordValue: 255,
  maxPhoneLength: 20,
};

const customMessages = {
  mandatory: "O campo é obrigatório.",
  invalidEmail: "Email inválido.",
  minLengthPassword: `Precisa ter no mínimo ${values.minPasswordValue} caracteres.`,
  maxLengthPassword: `Pode ter no máximo ${values.maxPasswordValue} caracteres.`,
  maxLengthPhone: `Pode ter no máximo ${values.maxPhoneLength} números.`,
  acceptTerms: "É obrigatório aceitar os termos.",
};

export const DatabaseSchema = z
  .object({
    email: z
      .string()
      .email(customMessages.invalidEmail)
      .nonempty(customMessages.mandatory),
    cpf: z.string().max(values.maxCpfLength).nonempty(customMessages.mandatory),
    state: z.string().nonempty(customMessages.mandatory),
    city: z.string().nonempty(customMessages.mandatory),
    name: z
      .string()
      .max(values.maxStringLength)
      .nonempty(customMessages.mandatory),
    zip_code: z
      .string()
      .max(values.maxZipCodeLength)
      .nonempty(customMessages.mandatory),
    phone: z
      .string()
      .max(values.maxPhoneLength, customMessages.maxLengthPhone)
      .nonempty(customMessages.mandatory),
    password: z
      .string()
      .min(values.minPasswordValue, customMessages.minLengthPassword)
      .max(values.maxPasswordValue, customMessages.maxLengthPassword),
    confirm_password: z
      .string()
      .min(values.minPasswordValue, customMessages.minLengthPassword)
      .max(values.maxPasswordValue, customMessages.maxLengthPassword),
    terms: z.literal(true, {
      errorMap: () => {
        return { message: customMessages.acceptTerms };
      },
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas devem ser iguáis",
    path: ["confirm_password"],
  });

export type DatabaseSchemaType = z.infer<typeof DatabaseSchema>;
