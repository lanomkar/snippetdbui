import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Settings, LogOut, Code2 } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  userEmail?: string;
  currentTeam?: string;
  teams?: { id: string; name: string }[];
  onTeamChange?: (teamId: string) => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const DashboardHeader = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  currentTeam = "Personal Team",
  teams = [
    { id: "1", name: "Personal Team" },
    { id: "2", name: "Development Team" },
    { id: "3", name: "Design Team" },
  ],
  onTeamChange = () => {},
  onSettings = () => {},
  onLogout = () => {},
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SnippetDB</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-4">
              {currentTeam}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Switch Team</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => onTeamChange(team.id)}
              >
                {team.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                />
                <AvatarFallback>
                  {userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
