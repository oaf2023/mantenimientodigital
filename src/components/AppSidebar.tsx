import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { FieldAlert } from "./FieldAlert";
import { MeetingAlert } from "./MeetingAlert";
import { SidebarMenuItem } from "./sidebar/SidebarMenuItem";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { menuItems, actionItems } from "@/config/menuItems";
import { configItems } from "@/config/configItems";
import { DatabaseConfigButton } from "./DatabaseConfigButton";

export function AppSidebar() {
  const [fieldAlertOpen, setFieldAlertOpen] = useState(false);
  const [meetingAlertOpen, setMeetingAlertOpen] = useState(false);

  const handleActionClick = (action: string) => {
    if (action === 'field') {
      setFieldAlertOpen(true);
    } else if (action === 'meeting') {
      setMeetingAlertOpen(true);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader />
          <SidebarGroupContent>
            <div className="flex items-center justify-between px-4 py-2">
              <DatabaseConfigButton />
            </div>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} {...item} />
              ))}
              {actionItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  {...item}
                  onClick={() => handleActionClick(item.action)}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <FieldAlert open={fieldAlertOpen} onOpenChange={setFieldAlertOpen} />
      <MeetingAlert open={meetingAlertOpen} onOpenChange={setMeetingAlertOpen} />
    </Sidebar>
  );
}