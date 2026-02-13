import { Card } from '@/components/ui/card';
import { Award, Shield, Star, Users } from 'lucide-react';

export const TrustBadges = () => {
  const badges = [
    {
      icon: Award,
      text: "AV Rated"
    },
    {
      icon: Star,
      text: "5-Star Reviews"
    },
    {
      icon: Shield,
      text: "BBB A+"
    },
    {
      icon: Users,
      text: "500K+ Clients"
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4 text-center">Why Choose Us</h3>
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
              <Icon className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-semibold">{badge.text}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          No Fees Unless We Win Your Case
        </p>
      </div>
    </Card>
  );
};
