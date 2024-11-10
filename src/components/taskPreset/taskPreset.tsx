import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

type TaskPresetProps = {
  id: number;
  name: string;
  duration: number;
};

const handleSave = () => {};

const handleDelete = () => {};

export default function TaskPreset({ id, name, duration }: TaskPresetProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

  return (
    <div ref={setNodeRef} style={style} className="my-2">
      <Card className="mx-4 bg-lime-100">
        <CardContent className="p-3">
          <div className="flex justify-between">
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={handleSave}
                role="button"
              >
                <Image
                  src="/image/save.svg"
                  alt="保存アイコン"
                  width={20}
                  height={20}
                />
              </div>
              <span className="ml-4 text-gray-700">{name}</span>
            </div>
            <div className="flex">
              <span className="mr-4 text-gray-700">{duration}min</span>
              <div
                className="cursor-pointer"
                onClick={handleDelete}
                role="button"
              >
                <Image
                  src="/image/trash.svg"
                  alt="削除アイコン"
                  width={20}
                  height={20}
                />
              </div>
              <div {...listeners} {...attributes} role="button">
              <Image
                src="/image/sort.svg"
                alt="並び替えアイコン"
                width={20}
                height={20}
                className="ml-3 cursor-move"
              />
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
