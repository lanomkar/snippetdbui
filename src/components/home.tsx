import React, { useState } from "react";
import DashboardHeader from "./layout/DashboardHeader";
import TeamSidebar from "./teams/TeamSidebar";
import SnippetList from "./snippets/SnippetList";

interface HomeProps {
  userName?: string;
  userEmail?: string;
  currentTeam?: string;
  teams?: Array<{
    id: string;
    name: string;
    categories: Array<{
      id: string;
      name: string;
      snippetCount: number;
      subCategories?: Array<{
        id: string;
        name: string;
        snippetCount: number;
      }>;
    }>;
  }>;
  snippets?: Array<{
    id: string;
    title: string;
    categoryId: string;
    description: string;
    language: string;
    code: string;
    isFavorite: boolean;
  }>;
}

const Home = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  currentTeam = "Personal Team",
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
  snippets = [
    {
      id: "1",
      categoryId: "2",
      title: "React useState Hook",
      description: "Example of using React's useState hook",
      language: "typescript",
      code: "const [state, setState] = useState(initialState);",
      isFavorite: true,
    },
    {
      id: "2",
      categoryId: "2",
      title: "Array Map Function",
      description: "How to use array map method",
      language: "javascript",
      code: "const newArray = array.map(item => item * 2);",
      isFavorite: false,
    },
  ],
}: HomeProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSnippets = snippets.filter(
    (snippet) => !selectedCategory || snippet.categoryId === selectedCategory,
  );

  const handleCategorySelect = (teamId: string, categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader
        userName={userName}
        userEmail={userEmail}
        currentTeam={currentTeam}
        teams={teams.map(({ id, name }) => ({ id, name }))}
        onTeamChange={(teamId) => console.log("Team changed:", teamId)}
        onSettings={() => console.log("Settings clicked")}
        onLogout={() => console.log("Logout clicked")}
      />

      <div className="flex flex-1 overflow-hidden">
        <TeamSidebar
          teams={teams}
          onAddTeam={() => console.log("Add team clicked")}
          onAddCategory={(teamId) =>
            console.log("Add category clicked:", teamId)
          }
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        <main className="flex-1 overflow-auto">
          <SnippetList
            snippets={filteredSnippets}
            onAddSnippet={() => console.log("Add snippet clicked")}
            onSearch={(query) => console.log("Search query:", query)}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
