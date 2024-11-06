import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";

export default function Question3() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <Card className="w-3/4 max-w-md">
        <CardHeader>
          <CardTitle>アンケート</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup name="routine">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="">10分</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="2" />
              <Label>20分</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="3" />
              <Label>30分</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <div className="mb-4">
          <Button>
            <Link href="/home">次へ</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
