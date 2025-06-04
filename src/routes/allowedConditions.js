export const allowCondition = (
  userProfile,
  userId = null,
  professionalId = null
) => {
  if (userProfile === "admin") return true;
  if (
    userProfile === "profesional" &&
    parseInt(userId) === parseInt(professionalId)
  )
    return true;
  return false;
};
