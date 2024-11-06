'use client'

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";

export default function Question() {
  const [step, setStep] = useState(1); // ステップの状態を管理

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <Card className="w-3/4 max-w-md">
        <CardHeader>
          <CardTitle>アンケート</CardTitle>
        </CardHeader>
        <CardContent>
          
        {step === 1 ? (
            // Question 1
          <div className="space-y-2">
            <h2 className="text-lg font-medium">あなたの習慣は？</h2>
            <div className="flex items-center space-x-2">
              <Checkbox id="running" />
              <label
                htmlFor="running"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ランニング
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="breakfast" />
              <label
                htmlFor="breakfast"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                朝食
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="morningShower" />
              <label
                htmlFor="morningShower"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                朝シャン
              </label>
            </div>
          </div>
           ) : (
            // Question 2
            <div className="space-y-4">
              <h2 className="text-lg font-medium">運動の所要時間は？</h2>
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10min" id="10min" />
                  <Label htmlFor="10min">10分</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20min" id="20min" />
                  <Label htmlFor="20min">20分</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30min" id="30min" />
                  <Label htmlFor="30min">30分</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </CardContent>

        <div className="mb-4">
          {step === 1 ? (
            <Button onClick={() => setStep(2)}>次へ</Button>
          ) : (
            <Button>
              <Link href="/home">次へ</Link>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
