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
    <div className="bg-muted/50 border rounded-lg p-4">
      <h4 className="text-md font-medium mb-3">Summary</h4>
      <table className="w-full text-sm">
        <tbody>
          {summaryData.map((item, index) => (
            <tr key={index}>
              <td className="py-2 text-muted-foreground">{item.label}</td>
              <td className="py-2 font-medium">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}