export const removeColorColon = (label: string | number) => {
  if (typeof label === "number") return label;

  const match = label.match(/:(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3})$/);
  if (match) {
    return label.replace(/:#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}$/, "");
  }
  return label;
};
