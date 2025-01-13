import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown, FolderPlus, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AddTeamModal from "./AddTeamModal";
import AddCategoryModal from "./AddCategoryModal";

interface Category {
  id: string;
  name: string;
  snippetCount: number;
  subCategories?: Category[];
}

interface TeamSidebarProps {
  teams?: Array<{
    id: string;
    name: string;
    categories: Category[];
  }>;
  onAddTeam?: () => void;
  onAddCategory?: (teamId: string, parentCategoryId?: string) => void;
  onSelectCategory?: (teamId: string, categoryId: string) => void;
  selectedCategory?: string | null;
}

const TeamSidebar = ({
  teams = [
    {
      id: "1",
      name: "Personal Team",
      categories: [
        {
          id: "1",
          name: "JavaScript",
          snippetCount: 5,
          subCategories: [
            { id: "2", name: "React", snippetCount: 3 },
            { id: "3", name: "Vue", snippetCount: 2 },
          ],
        },
        {
          id: "4",
          name: "Python",
          snippetCount: 3,
        },
      ],
    },
  ],
  onAddTeam = () => {},
  onAddCategory = () => {},
  onSelectCategory = () => {},
  selectedCategory = null,
}: TeamSidebarProps) => {
  const [showAddTeamModal, setShowAddTeamModal] = React.useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = React.useState(false);
  const [currentTeamId, setCurrentTeamId] = React.useState<string>("");
  const [currentParentCategory, setCurrentParentCategory] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleAddCategory = (
    teamId: string,
    parentCategory?: { id: string; name: string },
  ) => {
    setCurrentTeamId(teamId);
    setCurrentParentCategory(parentCategory || null);
    setShowAddCategoryModal(true);
  };

  const renderCategory = (category: Category, teamId: string, depth = 0) => {
    const isSelected = category.id === selectedCategory;

    return (
      <div key={category.id} className={`ml-${depth * 4}`}>
        <Collapsible>
          <div
            className={`flex items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer ${isSelected ? "bg-gray-100 dark:bg-gray-800" : ""}`}
          >
            <div
              className="flex items-center gap-2 flex-1"
              onClick={() => onSelectCategory(teamId, category.id)}
            >
              {category.subCategories && category.subCategories.length > 0 && (
                <CollapsibleTrigger
                  className={`${isSelected ? "text-primary" : ""}`}
                >
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
              )}
              <span
                className={`text-sm font-medium ${isSelected ? "text-primary" : ""}`}
              >
                {category.name}
              </span>
              <span className="text-xs text-gray-500">
                ({category.snippetCount})
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                handleAddCategory(teamId, {
                  id: category.id,
                  name: category.name,
                });
              }}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {category.subCategories && (
            <CollapsibleContent>
              <div className="ml-4">
                {category.subCategories.map((subCategory) =>
                  renderCategory(subCategory, teamId, depth + 1),
                )}
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    );
  };

  return (
    <div className="w-[280px] h-full border-r bg-white dark:bg-gray-900 flex flex-col">
      <div className="p-4 border-b">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => setShowAddTeamModal(true)}
        >
          <Plus className="h-4 w-4" />
          Add Team
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {teams.map((team) => (
          <div key={team.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{team.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleAddCategory(team.id)}
              >
                <FolderPlus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              {team.categories.map((category) =>
                renderCategory(category, team.id),
              )}
            </div>
          </div>
        ))}
      </ScrollArea>

      <AddTeamModal
        open={showAddTeamModal}
        onOpenChange={setShowAddTeamModal}
        onSubmit={(data) => {
          console.log("New team:", data);
          onAddTeam();
        }}
      />

      <AddCategoryModal
        open={showAddCategoryModal}
        onOpenChange={setShowAddCategoryModal}
        onSubmit={(data) => {
          onAddCategory(currentTeamId, currentParentCategory?.id);
          console.log("New category:", {
            ...data,
            teamId: currentTeamId,
            parentCategoryId: currentParentCategory?.id,
          });
        }}
        isSubcategory={!!currentParentCategory}
        parentCategoryName={currentParentCategory?.name}
      />
    </div>
  );
};

export default TeamSidebar;
