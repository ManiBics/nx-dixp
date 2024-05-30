import React, { createContext, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CartContext = createContext();

export default function BackdropProvider({ children }) {
  const [open, setOpen] = React.useState(false);
  const hideBackDrop = () => {
    setOpen(false);
  };
  const showBackDrop = () => {
    setOpen(true);
  };

  return (
    <CartContext.Provider value={{ showBackDrop, hideBackDrop }}>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgba(255,255,255,.3)",
        }}
        open={open}
      >
        <CircularProgress size={50} color="primary" />
      </Backdrop>
      {children}
    </CartContext.Provider>
  );
}

export const useBackDrop = () => useContext(CartContext);
