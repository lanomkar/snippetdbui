import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Star, Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SnippetCardProps {
  title?: string;
  description?: string;
  language?: string;
  code?: string;
  isFavorite?: boolean;
  onCopy?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
}

const SnippetCard = ({
  title = "Example Snippet",
  description = "A simple code snippet example",
  language = "javascript",
  code = 'console.log("Hello World!");',
  isFavorite = false,
  onCopy = () => {},
  onShare = () => {},
  onFavorite = () => {},
}: SnippetCardProps) => {
  return (
    <Card className="w-[380px] h-[320px] bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold truncate">
            {title}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {language}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md overflow-auto max-h-[140px]">
          <code className="text-sm font-mono">{code}</code>
        </pre>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy snippet</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share snippet</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onFavorite}
                className={isFavorite ? "text-yellow-500" : ""}
              >
                <Star className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default SnippetCard;
