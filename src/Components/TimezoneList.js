// import React from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { format, addMinutes } from 'date-fns';
// import { toZonedTime } from 'date-fns-tz';
// import { newDate } from 'react-datepicker/dist/date_utils';

// const TimezoneList = ({ timezones, utcTime, onRemove, onReorder }) => {
//   const handleOnDragEnd = (result) => {
//     if (!result.destination) return;
//     const items = Array.from(timezones);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     onReorder(items);
//   };

//   return (
//     <DragDropContext onDragEnd={handleOnDragEnd}>
//       <Droppable droppableId="timezones">
//         {(provided) => (
//           <ul {...provided.droppableProps} ref={provided.innerRef}>
//             {timezones.map((tz, index) => {
//               const zonedTime = toZonedTime(addMinutes(newDate(), utcTime),tz)
//               return (
//                 <Draggable key={tz} draggableId={tz} index={index}>
//                   {(provided) => (
//                     <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                       {format(zonedTime, 'yyyy-MM-dd hh:mm a')} - {tz}
//                       <button onClick={() => onRemove(tz)}>X</button>
//                     </li>
//                   )}
//                 </Draggable>
//               );
//             })}
//             {provided.placeholder}
//           </ul>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default TimezoneList;


import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format, addMinutes } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define the component
const TimezoneList = ({ timezones, utcTime, onRemove, onReorder, selectedDate, onDateChange }) => {

  // Handle drag end event
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(timezones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onReorder(items);
  };
  

  return (
    <div>
      {/* Date Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={date => onDateChange(date)}
        dateFormat="yyyy/MM/dd"
      />

      {/* Drag and Drop List */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="timezones">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {timezones.map((tz, index) => {
                const zonedTime = toZonedTime(addMinutes(selectedDate, utcTime), tz);
                return (
                  <Draggable key={tz} draggableId={tz} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {format(zonedTime, 'yyyy-MM-dd hh:mm a')} - {tz}
                        <button onClick={() => onRemove(tz)}>X</button>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TimezoneList;
