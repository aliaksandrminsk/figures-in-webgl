import { createContext, useContext } from "react";
import SettingStore from "./SettingStore";

const store = {
  settingStore: new SettingStore(),
};

export const StoreContext = createContext({} as typeof store);

export const useStore = () => {
  return useContext(StoreContext) as typeof store;
};

export default store;
