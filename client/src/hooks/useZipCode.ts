import React from "react";

export const useZipCode = <T>() => {
  const [data, setData] = React.useState<T | null>(null);
  const [errors, setErrors] = React.useState("");

  const handleZipCode = async (e: React.FocusEvent<HTMLInputElement>) => {
    setErrors("");
    const { value } = e.target;
    try {
      const fetchData = await fetch(`https://viacep.com.br/ws/${value}/json/`);

      if (!fetchData.ok) {
        setErrors("O cep informado é inválido.");
        return;
      }

      const result = await fetchData.json();
      setData(result);
    } catch (error) {
      console.error(error);
      setErrors("Erro ao buscar os dados, tente novamente.");
    }
  };

  return {
    handleZipCode,
    data,
    errors,
  };
};
