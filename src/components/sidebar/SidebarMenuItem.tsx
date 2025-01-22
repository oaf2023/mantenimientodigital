import { Link } from "react-router-dom";
import {
  SidebarMenuItem as BaseSidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  title: string;
  icon: LucideIcon;
  path?: string;
  action?: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

export const SidebarMenuItem = ({
  title,
  icon: Icon,
  path,
  description,
  className,
  onClick,
}: MenuItemProps) => {
  const content = (
    <>
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </>
  );

  return (
    <BaseSidebarMenuItem>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton
            asChild={!!path}
            className={className}
            onClick={onClick}
          >
            {path ? (
              <Link to={path} className="flex items-center gap-2">
                {content}
              </Link>
            ) : (
              <div className="flex items-center gap-2">{content}</div>
            )}
          </SidebarMenuButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </BaseSidebarMenuItem>
  );
};