export const allowCondition = (profile, userId, professionalId) => {
  if (profile === "admin") return true;
  if (
    profile === "profesional" &&
    parseInt(userId) === parseInt(professionalId)
  )
    return true;
  return false;
};
