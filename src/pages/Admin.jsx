import { AppSidebar } from "@/components/app-sidebar";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GetUsers, DeleteUser, UpdateUser } from "@/api/UserApi";
import { useEffect, useState } from "react";

export default function Admin({ user }) {
  const [listUsers, setListUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ first_name: "", last_name: "", email: "", role: "" });
  const [editError, setEditError] = useState("");
  useEffect(() => {
    async function loadUsers() {
      try {
        const users = await GetUsers();
        console.log("users", users);
        setListUsers(users);
      } catch (error) {
        console.log(error);
      }
    }
    loadUsers();
  }, []);

  async function onDelete(param) {
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
  if (listUsers.length === 0) {
    return <h3>No user have in The Application</h3>;
  }
  console.log(listUsers);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Welcome {user.first_name + " "} {user.last_name}{" "}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
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
                  <TableCell>{editingUserId === itme._id ? <input className="w-full rounded border px-2 py-1" value={editForm.first_name} onChange={(event) => setEditForm({ ...editForm, first_name: event.target.value })} aria-label="First name" /> : itme.first_name}</TableCell>
                  <TableCell>{editingUserId === itme._id ? <input className="w-full rounded border px-2 py-1" value={editForm.last_name} onChange={(event) => setEditForm({ ...editForm, last_name: event.target.value })} aria-label="Last name" /> : itme.last_name}</TableCell>
                  <TableCell>{editingUserId === itme._id ? <input className="w-full rounded border px-2 py-1" type="email" value={editForm.email} onChange={(event) => setEditForm({ ...editForm, email: event.target.value })} aria-label="Email" /> : itme.email}</TableCell>
                  <TableCell>{editingUserId === itme._id ? <input className="w-full rounded border px-2 py-1" value={editForm.role} onChange={(event) => setEditForm({ ...editForm, role: event.target.value })} aria-label="Role" /> : itme.role}</TableCell>
                  <TableCell>{itme.createdAt}</TableCell>
                  <TableCell className="text-right flex gap-4 ">
                    {editingUserId === itme._id ? <>
                      <Button onClick={() => saveUser(itme)}>Save</Button>
                      <Button variant="outline" onClick={() => { setEditingUserId(null); setEditError(""); }}>Cancel</Button>
                    </> : <Button onClick={() => startEditing(itme)}>Edit user</Button>}
                    <Button className="bg-red-500"   onClick={()=>{
                      onDelete(itme.email)
                    }}>delete user</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {editError && <p className="text-sm text-red-600" role="alert">{editError}</p>}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
