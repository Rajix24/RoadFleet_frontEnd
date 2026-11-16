import { AppSidebar } from "@/components/app-sidebar";
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

import { GetUsers } from "@/api/UserApi";
import { useEffect, useState } from "react";

export default function Admin({ user }) {
  const [listUsers, setListUsers] = useState([])
  useEffect(()=>{
    async function loadUsers(){
      try{
        const users = await GetUsers()
        console.log("users", users)
        setListUsers(users)
      }catch(error){
        console.log(error)
      }
    }
    loadUsers()
  }, [])




  if(listUsers.length === 0) {
    return (
          <h3>No user have in The Application</h3>      
    )
  }
  console.log(listUsers)
  

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {listUsers.map((itme) => (
                <TableRow key={itme._id}>
                  <TableCell>{itme.first_name}</TableCell>
                  <TableCell>{itme.last_name}</TableCell>
                  <TableCell>{itme.email}</TableCell>
                  <TableCell>{itme.role}</TableCell>
                  <TableCell>{itme.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
