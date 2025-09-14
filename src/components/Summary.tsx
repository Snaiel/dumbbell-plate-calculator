import { Card, CardContent, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import type { WeightResult, UnitSystem, Plate } from "../types";

interface SummaryProps {
  results: WeightResult[];
  plates: Plate[];
  unitSystem: UnitSystem;
  maxPlatesPerSide: number;
}

export function Summary({ results, plates, unitSystem, maxPlatesPerSide }: SummaryProps) {
  if (results.length === 0) {
    return null;
  }

  const summaryData = [
    {
    label: "Total plates:",
    value: plates.reduce((sum, plate) => sum + plate.quantity, 0).toString()
    },
    {
    label: "Max plates/side:",
    value: maxPlatesPerSide.toString()
    },
    {
    label: "Combinations:",
    value: results.length.toString()
    },
    {
      label: "Lightest:",
      value: `${results[0]?.totalWeight} ${unitSystem}`
    },
    {
      label: "Heaviest:",
      value: `${results[results.length - 1]?.totalWeight} ${unitSystem}`
    },
  ];

  return (
    <Card className="bg-muted">
      <CardContent>
        <CardTitle className="text-sm font-medium">Summary</CardTitle>
        <Table>
          <TableBody>
            {summaryData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="py-2 text-muted-foreground text-sm">{item.label}</TableCell>
                <TableCell className="py-2 font-medium text-sm">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}