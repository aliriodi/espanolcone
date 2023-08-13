import  { configureStore } from "@reduxjs/toolkit";
import datos from "./ECESlice"

export const store = configureStore  ({
    reducer:{
      datos:datos,
    }
  });