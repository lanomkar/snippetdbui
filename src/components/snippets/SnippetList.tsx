import React from "react";
import SnippetCard from "./SnippetCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  isFavorite: boolean;
}

interface SnippetListProps {
  snippets?: Snippet[];
  onAddSnippet?: () => void;
  onSearch?: (query: string) => void;
}

const defaultSnippets: Snippet[] = [
  {
    id: "1",
    title: "React useState Hook",
    description: "Example of using React's useState hook",
    language: "typescript",
    code: "const [state, setState] = useState(initialState);",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Array Map Function",
    description: "How to use array map method",
    language: "javascript",
    code: "const newArray = array.map(item => item * 2);",
    isFavorite: false,
  },
  {
    id: "3",
    title: "CSS Flexbox Center",
    description: "Center elements with flexbox",
    language: "css",
    code: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
    isFavorite: false,
  },
];

const SnippetList = ({
  snippets = defaultSnippets,
  onAddSnippet = () => {},
  onSearch = () => {},
}: SnippetListProps) => {
  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search snippets..."
              className="pl-10"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <Button onClick={onAddSnippet}>
            <Plus className="h-4 w-4 mr-2" />
            Add Snippet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            title={snippet.title}
            description={snippet.description}
            language={snippet.language}
            code={snippet.code}
            isFavorite={snippet.isFavorite}
            onCopy={() => console.log(`Copying snippet ${snippet.id}`)}
            onShare={() => console.log(`Sharing snippet ${snippet.id}`)}
            onFavorite={() =>
              console.log(`Toggling favorite for ${snippet.id}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SnippetList;
