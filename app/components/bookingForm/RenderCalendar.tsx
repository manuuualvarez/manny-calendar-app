"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "./Calendar";
import { useState, useEffect } from "react";
import { addDays } from 'date-fns';
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
  parseDate,
} from "@internationalized/date";

interface iAppProps {
  daysofWeek: { day: string; isActive: boolean }[];
}

export function RenderCalendar({ daysofWeek }: iAppProps) {
  const router = useRouter();
  // Date param in the url
  const searchParams = useSearchParams();
  const tomorrow = today(getLocalTimeZone()).add({ days: 1 });

  const [date, setDate] = useState<CalendarDate>(() => {
    const dateParam = searchParams.get("date")
    return dateParam ? parseDate(dateParam) : tomorrow;
  });

  

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      setDate(parseDate(dateParam));
    }
  }, [searchParams]);

  // Uopdate the date in the url as a parameter
  const handleChangeDate = (date: DateValue) => {

      setDate(date as CalendarDate);
      const url = new URL(window.location.href);
      url.searchParams.set("date", date.toString());
      router.push(url.toString());
  };

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay()

    
    // Adjust the index to match the daysofWeek array
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return !daysofWeek[adjustedIndex].isActive;
  };

  return (
    <Calendar
      minValue={tomorrow}
      defaultValue={tomorrow}
      value={date}
      onChange={handleChangeDate}
      isDateUnavailable={isDateUnavailable}
    />
  );
}
