"use client";

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
  const [selectedValue, setSelectedValue] = useState<string>(""); // 現在の選択値
  const [inputValue, setInputValue] = useState<string>(""); // その他入力欄の値
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // チェックされた選択肢を保存

  const initialQuestionChoices: string[] = [
    "ランニング",
    "朝食",
    "着替え",
    "薪割り",
    "ブルアカ",
    "ポケポケ",
    "ラジオ体操",
  ];
  const questionContext = {
    member: [
      {
        title: "ランニングの所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ],
      },
      {
        title: "朝食の所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ],
      },
      {
        title: "着替えの所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ],
      },
      {
        title: "薪割りの所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ],
      },
      {
        title: "ブルアカの所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ],
      },
      {
        title: "ポケポケの所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ],
      },
      {
        title: "ラジオ体操の所要時間は？",
        choice: [
          { text: "10分", id: "10min" },
          { text: "20分", id: "20min" },
          { text: "30分", id: "30min" },
        ],
      },
    ],
  };

  /**
   * 達成時刻を決める設問
   */
  const GOAL_TIME_QUESTION = 1;

  /**
   * 質問するタスクを決める設問
   */
  const INITIAL_QUESTION = 2;

  /**
   * 設問のHTMLオブジェクト
   */
  let questionContent = null;

  /**
   * 「次へ」ボタンのHTMLオブジェクト
   */
  let nextButtonContent = null;

  type questionTime = {
    title: string;
    choice: { text: string; id: string }[];
  };

  // type questionTimeArray = {
  //   running: questionTime;
  //   breakfast: questionTime;
  //   dressing: questionTime;
  // };

  const handleNextStep = () => {
    setStep(step + 1);
    setSelectedValue(""); // 選択をリセット
    setInputValue(""); // 入力欄をリセット
  };

  //  stepの値に応じて質問と「次へ」ボタンを設定
  switch (step) {
    case GOAL_TIME_QUESTION:
      questionContent = <GoalTimeQuestionComponent></GoalTimeQuestionComponent>;
      nextButtonContent = <Button onClick={handleNextStep} className="bg-darkBlue">次へ</Button>;
      break;

    case INITIAL_QUESTION:
      questionContent = (
        <InitialQuestion
          initialQuestionChoices={initialQuestionChoices}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      );
      nextButtonContent = (
        <Button onClick={handleNextStep} disabled={selectedItems.length == 0} className="bg-darkBlue">
          次へ
        </Button>
      );
      break;

    default:
      const selectedItem = selectedItems[step - 3];
      const questionData = selectedItem !== undefined ? questionContext.member[selectedItem] : undefined;

      if(questionData !== undefined){
        questionContent = (
          <QuestionComponent
            questionData={questionData} //  生成に用いるjsonを渡す
            selectedValue={selectedValue} //  現在選択されている値を取得
            setSelectedValue={setSelectedValue}
            inputValue={inputValue} //  その他の入力を取得
            setInputValue={setInputValue}
          />
        );
      }

      if (step < selectedItems.length + 2) {
        nextButtonContent = (
          <Button onClick={handleNextStep} disabled={!selectedValue} className="bg-darkBlue">
            次へ
          </Button>
        );
      } else {
        nextButtonContent = (
          <Button disabled={!selectedValue} className="bg-darkBlue">
            <Link href="/home">次へ</Link>
          </Button>
        );
      }
  }

  return (
    <div className="flex-col items-center justify-center bg-slate-50 text-center font-mPlus max-w-md, mx-auto">
      <div className="pb-20 pt-20">
        <h1 className="m-2 text-5xl text-darkBlue">アンケート</h1>
        <h2 className="pt-2 text-xl text-darkBlue">
          回答結果に基づき<br></br>アプリがカスタマイズされます。
        </h2>
      </div>

      <div className="flex h-screen flex-col items-center text-center">
        <Card className="w-3/4 max-w-md border-2 border-darkBlue">
          <CardHeader>
            <CardTitle>
              ( {step} / {selectedItems.length + 2} )
            </CardTitle>
          </CardHeader>

          <CardContent>{questionContent}</CardContent>

          <div className="mb-4">{nextButtonContent}</div>
        </Card>
        <StepIndicator
          currentStep={step}
          totalSteps={selectedItems.length + 2}
        />
      </div>
    </div>
  );
}

/**
 * 設問コンポーネント：達成時刻を入力
 * @returns HTMLオブジェクト
 */
function GoalTimeQuestionComponent() {
  const [time, setTime] = useState<string>("10:00"); // 初期値を設定

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value); // 入力された時刻を更新
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">
        達成時刻を入力してください<br></br>
      </h2>
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="mt-4 w-full max-w-[200px] rounded-md border p-2"
      />
    </div>
  );
}

type initialQuestionProps = {
  initialQuestionChoices: string[];
  selectedItems: number[];
  setSelectedItems: (selectedItems: number[]) => void;
}

/**
 * 設問コンポーネント：質問するタスクの種類を選択
 * @param initialQuestionChoices 同名のstring[]フィールド
 * @param selectedItems 同名のnumber[]フィールド
 * @param setSelectedItems 同名のsetメソッド
 * @returns HTMLオブジェクト
 */
function InitialQuestion({
  initialQuestionChoices,
  selectedItems,
  setSelectedItems,
}: initialQuestionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">
        あなたの朝のルーティンは<br></br>どれですか？
      </h2>
      {initialQuestionChoices.map((item: string, index: number) => (
        <div key={item} className="flex items-center space-x-2">
          <Checkbox
            checked={selectedItems.includes(index)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedItems([...selectedItems, index]);
              } else {
                setSelectedItems(
                  selectedItems.filter((i: number) => i !== index),
                ); // 配列から消去
              }
            }}
          />
          <Label>{item}</Label>
        </div>
      ))}
    </div>
  );
}

type questionComponentProps = {
  questionData: {
    title: string;
    choice: {
      text: string;
      id: string;
    }[];
  };
  selectedValue: string;
  setSelectedValue: (selectedValue: string) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}

type choiceProps = {
  text: string;
  id: string;
}

/**
 * 設問コンポーネント：そのタスクにかかる時間を入力
 * @param questionData questipnContext.member[任意のindex]
 * @param selectedValue 同名のstringフィールド
 * @param selectedValue 同名のsetメソッド
 * @param inputValue 同名のstringフィールド
 * @param setInputValue 同名のsetメソッド
 * @returns HTMLオブジェクト
 */
function QuestionComponent({
  questionData,
  selectedValue,
  setSelectedValue,
  inputValue,
  setInputValue,
}: questionComponentProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">{questionData.title}</h2>
      <RadioGroup
        value={selectedValue}
        onValueChange={(value: string) => {
          setSelectedValue(value);
        }}
        className=""
      >
        {questionData.choice.map((choice: choiceProps) => (
          <div key={choice.id} className="flex items-center space-x-4">
            <RadioGroupItem value={choice.id} id={choice.id} />
            <Label htmlFor={choice.id}>{choice.text}</Label>
          </div>
        ))}
        <div className="flex items-center space-x-4">
          <RadioGroupItem value="other" id="other" />
          <Input
            type="text"
            placeholder="その他(分単位で数字のみ記入)"
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

/**
 * インジケータコンポーネント：アンケートの進度を表示する
 * @param currentStep 現在のアンケートの進度:number
 * @param totalSteps 設問の総数:number
 * @returns
 */
function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-4 mt-8 flex justify-center space-x-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full transition-all ${currentStep === index + 1 ? "scale-125 bg-darkBlue" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
}
