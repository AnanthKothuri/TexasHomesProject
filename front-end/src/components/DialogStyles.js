export const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 50,
  backgroundColor: "rgba(0, 0, 0, 0.65)",
  transition: "opacity 0.3s ease",
};

export const contentStyle = {
  position: "fixed",
  left: "50%",
  top: "50%",
  zIndex: 50,
  width: "95%",
  height: "95%",
  transform: "translate(-50%, -50%)",
  display: "grid",
  gridGap: "1rem",
  border: "1px solid #000",
  borderRadius: 10,
  backgroundColor: "#fff",
  padding: "2rem",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease",
};

export const closeButtonStyle = {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  cursor: "pointer",
  fontSize: "2em",
  backgroundColor: "white",
  borderWidth: 0,
};

export const dialogHeaderStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  textAlign: "center",
};

export const dialogFooterStyle = {
  display: "flex",
  flexDirection: "column-reverse",
};

export const dialogTitleStyle = {
  fontSize: "1.125rem",
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: "-0.025em",
};

export const dialogDescriptionStyle = {
  fontSize: "0.875rem",
  color: "#6b7280",
};
