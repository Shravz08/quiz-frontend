import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="font-bold text-lg">Users</h2>
            <p className="text-gray-600 mt-2">Total: 120</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="font-bold text-lg">Revenue</h2>
            <p className="text-gray-600 mt-2">$45,900</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="font-bold text-lg">Tasks</h2>
            <p className="text-gray-600 mt-2">10 pending</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
