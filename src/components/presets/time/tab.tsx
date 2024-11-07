import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ScrollArea } from "~/components/ui/scroll-area";
import EditTime from "~/components/presets/time/edit";

export default function TabTime() {
  return (
    <div className="">
      {/* 時間 */}
      <Card className="h-[700px] md:h-[500px]">
        <ScrollArea>
          <CardContent className="space-y-2 mt-4">
            <EditTime>1限電車</EditTime>
            <EditTime>2限電車</EditTime>
            <EditTime>3限電車</EditTime>
            <Button className="mt-4">+</Button>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
