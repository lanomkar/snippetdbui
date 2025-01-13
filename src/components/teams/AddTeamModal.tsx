import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface AddTeamModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: { name: string; emails: string[] }) => void;
}

export const AddTeamModal = ({
  open = false,
  onOpenChange = () => {},
  onSubmit = () => {},
}: AddTeamModalProps) => {
  const [teamName, setTeamName] = React.useState("");
  const [emails, setEmails] = React.useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: teamName, emails });
    onOpenChange(false);
    setTeamName("");
    setEmails([]);
    setCurrentEmail("");
  };

  const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentEmail) {
      e.preventDefault();
      if (currentEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setEmails([...emails, currentEmail]);
        setCurrentEmail("");
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Add team member email (Press Enter)"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              onKeyDown={handleAddEmail}
            />
          </div>
          {emails.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {emails.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                >
                  <span className="text-sm">{email}</span>
                  <button
                    type="button"
                    onClick={() => removeEmail(email)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={!teamName}>
              Create Team
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamModal;
