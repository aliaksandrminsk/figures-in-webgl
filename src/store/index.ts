import { createContext, useContext } from "react";
import SettingStore from "./SettingStore";

const store = {
  settingStore: new SettingStore(),
};

export const StoreContext = createContext({} as any);

export const useStore = () => {
  return useContext(StoreContext) as any;
};

export default store;
