import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CaseType } from "@/data/cases";
interface CaseCardProps {
  case: CaseType;
}
const statusColors = {
  available: "text-white border-0",
  "high-volume": "text-white border-0",
  urgent: "text-white border-0",
  limited: "text-white border-0"
};
const statusBgColors = {
  available: "#00703c",
  "high-volume": "#f47738",
  urgent: "#d4351c",
  limited: "#d4351c"
};
const statusLabels = {
  available: "Available",
  "high-volume": "High Volume",
  urgent: "Urgent",
  limited: "Limited"
};
export function CaseCard({
  case: caseItem
}: CaseCardProps) {
  return (
      <Link to={`/cases/${caseItem.slug}`} className="block h-full group">
        <Card className="h-full cursor-pointer shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <CardTitle className="text-lg font-bold leading-tight text-black group-hover:text-primary transition-colors">
              <span dangerouslySetInnerHTML={{ __html: caseItem.title.replace(/\s&\s/g, ' <span class="whitespace-nowrap">& </span>') }} />
            </CardTitle>
            <Badge className={`${statusColors[caseItem.status]} whitespace-nowrap font-bold text-[10px] tracking-wider`} style={{ backgroundColor: statusBgColors[caseItem.status] }}>
              {statusLabels[caseItem.status].toUpperCase()}
            </Badge>
        </div>
        <CardDescription className="text-black/70 leading-relaxed font-medium">
          {caseItem.summary}
        </CardDescription>
      </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
