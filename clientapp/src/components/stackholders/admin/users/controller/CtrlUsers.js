import { CITIES, COUNTRIES, initialAppState } from "appHelper/appVariables";
import {
  activateCustomer,
  banCustomer,
  customerDeleteAccount,
  customerUpdateSettings,
  deactivateCustomer,
  unBanCustomer,
} from "appHelper/fetchapi/tblUser/tblUser";
import moment from "moment";

export const CtrlUsers = {
  banCustomerHandler: async ({
    setIsLoading,
    bigUserID,
    user,
    setUsers,
    users,
    handleClose,
  }) => {
    try {
      setIsLoading(true);
      const bannedAccount = await banCustomer(bigUserID);
      if (bannedAccount?.blnIsDeleted) {
        const userIndex = users.findIndex(
          (user) => user.bigUserID === bigUserID
        );
        if (userIndex !== -1) {
          users[userIndex] = {
            ...users[userIndex],
            blnIsDeleted: true,
            dtmUpdatedDate: bannedAccount?.dtmUpdatedDate,
          };
          setUsers([...users]);
          handleClose();
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
  unBanCustomerHandler: async ({
    setIsLoading,
    bigUserID,
    user,
    setUsers,
    users,
    setUserInfo,
    handleClose,
  }) => {
    try {
      setIsLoading(true);
      const unbannedAccount = await unBanCustomer(bigUserID);
      if (unbannedAccount?.blnIsDeleted === false) {
        const userIndex = users.findIndex(
          (user) => user.bigUserID === bigUserID
        );
        if (userIndex !== -1) {
          users[userIndex] = {
            ...users[userIndex],
            blnIsDeleted: false,
            dtmUpdatedDate: unbannedAccount?.dtmUpdatedDate,
          };
          setUsers([...users]);
          handleClose();
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
  deactivateCustomerHandler: async ({
    setIsLoading,
    bigUserID,
    user,
    setUsers,
    users,
    setUserInfo,
    handleClose,
  }) => {
    try {
      setIsLoading(true);
      const deactivatedAccount = await deactivateCustomer(bigUserID);
      if (deactivatedAccount?.blnIsActive === false) {
        const userIndex = users.findIndex(
          (user) => user.bigUserID === bigUserID
        );
        if (userIndex !== -1) {
          users[userIndex] = {
            ...users[userIndex],
            blnIsActive: false,
            dtmUpdatedDate: deactivatedAccount?.dtmUpdatedDate,
          };
          setUsers([...users]);
          handleClose();
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
  activateCustomerHandler: async ({
    setIsLoading,
    bigUserID,
    user,
    setUsers,
    users,
    setUserInfo,
    handleClose,
  }) => {
    try {
      setIsLoading(true);
      const activatedAccount = await activateCustomer(bigUserID);
      if (activatedAccount?.blnIsActive) {
        const userIndex = users.findIndex(
          (user) => user.bigUserID === bigUserID
        );
        if (userIndex !== -1) {
          users[userIndex] = {
            ...users[userIndex],
            blnIsActive: true,
            dtmUpdatedDate: activatedAccount?.dtmUpdatedDate,
          };
          setUsers([...users]);
          handleClose();
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  },
};
