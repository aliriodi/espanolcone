import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePi() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log('====================================');
  console.log(selectedDate);
  console.log('====================================');
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="yyyy-mm-dd hh:mm"
          className="
            inline-flex
            w-full
            max-w-lg
            p-2
            rounded-md
            border border-gray-300
            shadow-sm
            focus:border-blue-500
            focus:ring-1
            focus:ring-blue-500
          "
        />
      </div>
    </>
  );
}
