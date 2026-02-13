import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BlogTableProps {
  caption?: string;
  headers: string[];
  rows: string[][];
  className?: string;
}

export const BlogTable = ({ caption, headers, rows, className }: BlogTableProps) => {
  return (
    <div className="my-8 overflow-x-auto">
      <Table className={className}>
        {caption && (
          <caption className="lr-heading-s text-left mb-4 mt-0">
            {caption}
          </caption>
        )}
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="lr-body font-bold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="lr-body">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
