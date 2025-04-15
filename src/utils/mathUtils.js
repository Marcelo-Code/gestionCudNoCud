//Función para calcular la edad
export const getAge = (birthDate) => {
  const today = new Date();
  const formattedBirthDate = new Date(birthDate);
  let age = today.getFullYear() - formattedBirthDate.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  if (
    month < formattedBirthDate.getMonth() ||
    (month === formattedBirthDate.getMonth() &&
      day < formattedBirthDate.getDate())
  )
    age--;
  return age;
};
