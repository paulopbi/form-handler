import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { DatabaseSchema, DatabaseSchemaType } from "../schema";
import { useHookFormMask } from "use-mask-input";
import { useZipCode } from "../hooks/useZipCode";
import { ZipCodeType } from "../types";

const Form = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DatabaseSchemaType>({
    resolver: zodResolver(DatabaseSchema),
  });

  const registerWithMask = useHookFormMask(register);
  const {
    handleZipCode,
    data: zipCodeData,
    errors: zipCodeErrors,
  } = useZipCode<ZipCodeType>();

  React.useEffect(() => {
    if (zipCodeData) {
      setValue("city", zipCodeData.localidade);
      setValue("state", zipCodeData.estado);
    }
  }, [zipCodeData]);

  const onSubmit: SubmitHandler<DatabaseSchemaType> = async (data) => {
    try {
      const sendData = await fetch("http://localhost:3333/api/users", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const response = await sendData.json();
      window.alert(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form">
      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
        <header className="form__header">
          <h1 className="form__title">Faça cadastro</h1>
          <p className="form__subtitle">
            Preencha os campos para criar sua conta.
          </p>
        </header>

        {/* name */}
        <div className="form__field">
          <img src="/person.svg" alt="Ícone de nome" />
          <input
            type="text"
            placeholder="Digite o seu nome"
            className="form__input-field"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <div className="error">
            <p>{errors.name.message}</p>
          </div>
        )}

        {/* email */}
        <div className="form__field">
          <img src="/at.svg" alt="Ícone de email" />
          <input
            type="email"
            placeholder="Digite o seu email"
            className="form__input-field"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <div className="error">
            <p>{errors.email.message}</p>
          </div>
        )}

        {/* password */}
        <div className="form__field">
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="invisible-button"
          >
            {isPasswordVisible ? (
              <img src="/visibility.svg" alt="Ícone de senha" />
            ) : (
              <img src="/visibility-off.svg" alt="Ícone de senha" />
            )}
          </button>
          <input
            type={isPasswordVisible ? "password" : "text"}
            placeholder="Digite sua senha"
            className="form__input-field"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <div className="error">
            <p>{errors.password.message}</p>
          </div>
        )}

        {/* confirm password */}
        <div className="form__field">
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="invisible-button"
          >
            {isPasswordVisible ? (
              <img src="/visibility.svg" alt="Ícone de senha" />
            ) : (
              <img src="/visibility-off.svg" alt="Ícone de senha" />
            )}
          </button>
          <input
            type={isPasswordVisible ? "password" : "text"}
            placeholder="Digite sua senha novamente"
            className="form__input-field"
            {...register("confirm_password")}
          />
        </div>
        {errors.confirm_password && (
          <div className="error">
            <p>{errors.confirm_password.message}</p>
          </div>
        )}

        {/* phone */}
        <div className="form__field">
          <img src="/iphone.svg" alt="Ícone de telefone" />
          <input
            type="text"
            placeholder="Digite seu telefone"
            className="form__input-field"
            {...registerWithMask("phone", [
              "(99) 9999-9999",
              "(99) 99999-9999",
            ])}
          />
        </div>
        {errors.phone && (
          <div className="error">
            <p>{errors.phone.message}</p>
          </div>
        )}

        {/* cpf */}
        <div className="form__field">
          <img src="/finger-print.svg" alt="Ícone de CPF" />
          <input
            type="text"
            placeholder="Digite seu CPF"
            className="form__input-field"
            {...registerWithMask("cpf", "cpf")}
          />
        </div>
        {errors.cpf && (
          <div className="error">
            <p>{errors.cpf.message}</p>
          </div>
        )}

        {/* cep */}
        <div className="form__field">
          <img src="/location-on.svg" alt="Ícone de CEP" />
          <input
            type="text"
            placeholder="Digite seu CEP"
            className="form__input-field"
            {...registerWithMask("zip_code", "99999-999")}
            onBlur={handleZipCode}
          />
        </div>
        {errors.zip_code && (
          <div className="error">
            <p>{errors.zip_code.message}</p>
          </div>
        )}

        {/* state */}
        <div className="form__field">
          <img src="/location-city.svg" alt="Ícone de endereço" />
          <input
            disabled
            type="text"
            placeholder="Estado"
            className="form__input-field"
            {...register("state")}
          />
        </div>
        {zipCodeErrors && (
          <div className="error">
            <p>{zipCodeErrors}</p>
          </div>
        )}

        {/* city */}
        <div className="form__field">
          <img src="/apartment.svg" alt="Ícone de cidade" />
          <input
            disabled
            type="text"
            placeholder="Cidade"
            className="form__input-field"
            {...register("city")}
          />
        </div>

        {/* terms */}
        <div className="form__field form__checkbox">
          <input type="checkbox" id="terms" {...register("terms")} />
          <label htmlFor="terms">Aceita todos os dados?</label>
        </div>
        {errors.terms && (
          <div className="error">
            <p>{errors.terms.message}</p>
          </div>
        )}

        <button className="form__button">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
