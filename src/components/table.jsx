
import { onDelete } from "@/services/user.service";

import { GetUsers, DeleteUser, UpdateUser } from "@/api/UserApi";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/userContext";
import { Button } from "./ui/button";  


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableData() {
  const {user} = useContext(UserContext)
  
  const [listUsers, setListUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ first_name: "", last_name: "", email: "", role: "" });
  const [editError, setEditError] = useState("");



  useEffect(() => {
    async function loadUsers() {
      try {
        const users = await GetUsers();
        setListUsers(users);
      } catch (error) {
        console.log(error);
      }
    }
    loadUsers();
  }, []);




  function startEditing(account) {
    setEditingUserId(account._id);
    setEditForm({
      first_name: account.first_name || "",
      last_name: account.last_name || "",
      email: account.email || "",
      role: account.role || "",
    });
    setEditError("");
  }

  async function saveUser(account) {
    try {
      setEditError("");
      await UpdateUser(account.email, editForm);
      setListUsers((users) => users.map((current) =>
        current._id === account._id ? { ...current, ...editForm } : current
      ));
      setEditingUserId(null);
    } catch (error) {
      setEditError(error.message || "Unable to update user");
    }
  }
  
    return (
    <Table className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Join</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listUsers.map((itme) => (
          <TableRow key={itme._id}>
            <TableCell>
              {editingUserId === itme._id ? (
                <input
                  className="w-full rounded border px-2 py-1"
                  value={editForm.first_name}
                  onChange={(event) =>
                    setEditForm({ ...editForm, first_name: event.target.value })
                  }
                  aria-label="First name"
                />
              ) : (
                itme.first_name
              )}
            </TableCell>
            <TableCell>
              {editingUserId === itme._id ? (
                <input
                  className="w-full rounded border px-2 py-1"
                  value={editForm.last_name}
                  onChange={(event) =>
                    setEditForm({ ...editForm, last_name: event.target.value })
                  }
                  aria-label="Last name"
                />
              ) : (
                itme.last_name
              )}
            </TableCell>
            <TableCell>
              {editingUserId === itme._id ? (
                <input
                  className="w-full rounded border px-2 py-1"
                  type="email"
                  value={editForm.email}
                  onChange={(event) =>
                    setEditForm({ ...editForm, email: event.target.value })
                  }
                  aria-label="Email"
                />
              ) : (
                itme.email
              )}
            </TableCell>
            <TableCell>
              {editingUserId === itme._id ? (
                <input
                  className="w-full rounded border px-2 py-1"
                  value={editForm.role}
                  onChange={(event) =>
                    setEditForm({ ...editForm, role: event.target.value })
                  }
                  aria-label="Role"
                />
              ) : (
                itme.role
              )}
            </TableCell>
            <TableCell>{itme.createdAt}</TableCell>
            <TableCell className="text-right flex gap-4 ">
              {editingUserId === itme._id ? (
                <>
                  <Button onClick={() => saveUser(itme)}>Save</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingUserId(null);
                      setEditError("");
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => startEditing(itme)}>Edit user</Button>
              )}
              <Button
                className="bg-red-500"
                onClick={() => {
                  onDelete(itme.email, setListUsers);
                }}
              >
                delete user
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
