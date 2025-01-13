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

interface AddCategoryModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: { name: string; parentCategoryId?: string }) => void;
  isSubcategory?: boolean;
  parentCategoryName?: string;
}

export const AddCategoryModal = ({
  open = false,
  onOpenChange = () => {},
  onSubmit = () => {},
  isSubcategory = false,
  parentCategoryName = "",
}: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: categoryName });
    onOpenChange(false);
    setCategoryName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isSubcategory
              ? `Add Subcategory to ${parentCategoryName}`
              : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder={`${isSubcategory ? "Subcategory" : "Category"} Name`}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!categoryName}>
              {isSubcategory ? "Add Subcategory" : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
