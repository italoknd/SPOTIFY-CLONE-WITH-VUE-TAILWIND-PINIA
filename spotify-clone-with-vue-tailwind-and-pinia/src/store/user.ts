import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "Italo Pedroza",
    userProfilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocJ-zkH1FfQwQhEAJa5_07Pp2q_HVmFnXS_ce9xYtPHGbnk=s96-c-rg-br100",
  }),
  actions: {},
  persist: true,
});
