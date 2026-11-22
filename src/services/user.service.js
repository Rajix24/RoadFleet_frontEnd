import { DeleteUser } from "@/api/UserApi";

export  async function onDelete(param, setListUsers) {
    try {
      const res = await DeleteUser(param);
      setListUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter(
          (user) => user.email !== param
        );

        console.log("Updated users:", updatedUsers);

        return updatedUsers;
      });

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
