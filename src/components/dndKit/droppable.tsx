import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

type DroppableProps = {
  id: number | string;
  children: ReactNode;
};

export default function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}