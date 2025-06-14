import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  title: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
  date: string | null;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const { title, description, icon: Icon, earned, date } = achievement;

  return (
    <Card className={`group transition-all duration-300 transform hover:-translate-y-1 ${
      earned 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg' 
        : 'bg-gray-50 border-gray-200 opacity-75'
    } hover:shadow-xl animate-scale-in`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-full ${
            earned 
              ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg' 
              : 'bg-gray-200 text-gray-400'
          } transition-all duration-300 group-hover:scale-110`}>
            <Icon className="h-6 w-6" />
          </div>
          {earned && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Earned
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <CardTitle className={`text-lg font-bold ${
          earned ? 'text-gray-800' : 'text-gray-500'
        }`}>
          {title}
        </CardTitle>
        <CardDescription className={`text-sm ${
          earned ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {description}
        </CardDescription>
        
        {earned && date && (
          <div className="pt-2 border-t border-yellow-200">
            <span className="text-xs text-yellow-700 font-medium">
              Earned on {new Date(date).toLocaleDateString()}
            </span>
          </div>
        )}
        
        {!earned && (
          <div className="pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500">
              Complete more courses to unlock this achievement
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
