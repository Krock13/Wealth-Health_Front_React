import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './datePicker.module.css';

/**
 * Properties for the DatePicker component.
 */
type DatePickerProps = {
  selectedDate: Date; // The currently selected date.
  onDateChange: (newDate: Date) => void; // Callback function when a new date is selected.
  closeDatePicker: () => void; // Function to close the DatePicker.
};

/**
 * A DatePicker component allowing users to select a date.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  closeDatePicker,
}) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [isOpen, setIsOpen] = useState(true);

  // Constants for days of the week and months.
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Generates a list of years for selection.
  const years = Array.from({ length: 105 }, (_, i) => currentYear - 100 + i);

  // Event handlers for navigating through months.
  const handlePreviousMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleNextMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  // Handler for selecting today's date.
  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    onDateChange(today);
  };

  // Helper functions to get days in a month and the first day of the month.
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Handler for selecting a date.
  const selectDate = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);

    const timezoneOffset = newDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(newDate.getTime() - timezoneOffset);

    onDateChange(adjustedDate);
    closeDatePicker();
  };

  // Generates the calendar with days.
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    const today = new Date();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.day} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;
      const isSelectedDay =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      days.push(
        <div
          key={day}
          className={`${styles.day} ${isSelectedDay ? styles.selected : ''} ${
            isToday ? styles.today : ''
          }`}
          onClick={() => selectDate(day)}
        >
          {day}
        </div>
      );
    }

    return <div className={styles.daysContainer}>{days}</div>;
  };

  // Handles closing the DatePicker when clicking outside.
  const handleCloseOnOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        closeDatePicker();
      }
    },
    [closeDatePicker]
  );

  // Effect for managing the outside click listener.
  useEffect(() => {
    window.addEventListener('mousedown', handleCloseOnOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleCloseOnOutsideClick);
    };
  }, [handleCloseOnOutsideClick]);

  // Return null to render nothing if the DatePicker is not open.
  if (!isOpen) return null;

  // Main rendering of the DatePicker component.
  return (
    <div ref={datePickerRef} className={styles.datePicker}>
      <div className={styles.header}>
        <button type='button' onClick={handlePreviousMonth}>
          &lt;
        </button>
        <button type='button' onClick={handleToday}>
          🏠
        </button>
        <select
          value={currentMonth}
          onChange={(e) => setCurrentMonth(parseInt(e.target.value, 10))}
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select value={currentYear} onChange={(e) => setCurrentYear(parseInt(e.target.value, 10))}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button type='button' onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div className={styles.weekDaysContainer}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.calendar}>{generateCalendar()}</div>
    </div>
  );
};

export default DatePicker;