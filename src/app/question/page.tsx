'use client';

import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export default function Question() {
  const [step, setStep] = useState<number>(1); // ステップの状態を管理
  const [selectedValue, setSelectedValue] = useState<string | null>(null); // 現在の選択値
  const [inputValue, setInputValue] = useState(""); // その他入力欄の値
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // チェックされた選択肢を保存

  const initialQuestionChoices:string[] = ["ランニング", "朝食", "着替え"];

  type questionTime = {
    title: string;
    choice: { text: string; id: string; }[];
  };

  type questionTimeArray = {
    running: questionTime;
    breakfast: questionTime;
    dressing: questionTime;
  }

  const questionTimes = {
    member: [
      {
        title: "ランニングの所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ]
      },
      {
        title: "朝食の所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ]
      },
      {
        title: "着替えの所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ]
      }
    ]
  };

  const handleNextStep = () => {
    setStep(step + 1);
    setSelectedValue(null); // 選択をリセット
    setInputValue(""); // 入力欄をリセット
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="m-2">アンケート</h1>
      <h2>回答結果に基づきアプリがカスタマイズされます。</h2>
      <Card className="w-3/4 max-w-md border-4 border-blue-400 ">
        <CardHeader>
          <CardTitle>( {step} / {selectedItems.length + 1} )</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <InitialQuestion initialQuestionChoices={initialQuestionChoices} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
          ) : (
            selectedItems.length > 0 && (
              <QuestionComponent
                // ここで["selectedItems[x]"]を指定できれば完成
                questionData={questionTimes.member[selectedItems[step - 2]!]}  //  生成に用いるjsonを渡す
                selectedValue={selectedValue} //  現在選択されている値を取得
                setSelectedValue={setSelectedValue}
                inputValue={inputValue} //  その他の入力を取得
                setInputValue={setInputValue}
              />
            )
          )}
        </CardContent>

        <div className="mb-4">
          {step < selectedItems.length + 1 ? (
            <div>
              <Button onClick={handleNextStep} disabled={!selectedValue}>
                次へ
              </Button>
              <Button onClick={handleNextStep}>
                スキップ
              </Button>
            </div>
          ) : (
            <div>
              <Button disabled={!selectedValue}>
                <Link href="/home">次へ</Link>
              </Button>
              <Button>
                <Link href="/home">スキップ</Link>
              </Button>
            </div>
          )}
        </div>
        <StepIndicator currentStep={step} totalSteps={selectedItems.length + 1} />
      </Card>
    </div>
  );
}

function InitialQuestion({initialQuestionChoices, selectedItems, setSelectedItems }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">あなたの朝のルーティンは<br></br>どれですか？</h2>
      {initialQuestionChoices.map((item:string, index:number) => (
        <div key={item} className="flex items-center space-x-2">
          <Checkbox
            checked={selectedItems.includes(index)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedItems([...selectedItems, index]);
              } else {
                setSelectedItems(selectedItems.filter((i: number) => i !== index)); // 配列から消去
              }
            }}
          />
          <Label>{item}</Label>
        </div>
      ))}
    </div>
  );
}

function QuestionComponent({ questionData, selectedValue, setSelectedValue, inputValue, setInputValue }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">{questionData.title}</h2>
      <RadioGroup
        value={selectedValue} 
        onValueChange={(value: string) => {
          setSelectedValue(value);
        }}
      >
        {questionData.choice.map((choice: any) => (
          <div key={choice.id} className="flex items-center space-x-2">
            <RadioGroupItem value={choice.id} id={choice.id} />
            <Label htmlFor={choice.id}>{choice.text}</Label>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other" />
          <Input
            type="text"
            placeholder="その他"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setSelectedValue("other");
            }}
            disabled={selectedValue !== "other"}
          />
        </div>
      </RadioGroup>
    </div>
  );
}

// インジケーターコンポーネント
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex justify-center space-x-2 mt-4 mb-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full transition-all ${currentStep === index + 1 ? "bg-slate-950 scale-125" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
}
