import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { UserContext } from "@/context/userContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {

  teams: [
    {
      name: "RoadFleet",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "RoadFleet.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Roodflet.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "OverView",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "dashboard",
          url: "/admin",
        },
        {
          title: "assigne",
          url: "/assigne",
        },
        {
          title: "Marchandise",
          url: "#",
        },
      ],
    },




    
        {
      title: "Materials",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Camions",
          url: "camions",
        },
        {
          title: "remoques",
          url: "remorque",
        },
        {
          title: "pneus",
          url: "pneus",
        },
      ],
    },
    {
      title: "Trajet",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Trajet",
          url: "trajet",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const {user} = React.useContext(UserContext)
  data["user"]= user
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
