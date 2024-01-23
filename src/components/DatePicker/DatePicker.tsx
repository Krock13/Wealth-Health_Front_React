import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './datePicker.module.css';

/**
 * Type definition for the properties of the DatePicker component.
 */
type DatePickerProps = {
  selectedDate: Date; // The currently selected date.
  onDateChange: (newDate: Date) => void; // Callback function when a new date is selected.
  closeDatePicker: () => void; // Function to close the DatePicker.
};

/**
 * A DatePicker component allowing users to select a date.
 *
 * @param {DatePickerProps} props The properties passed to the DatePicker component.
 * @returns {React.FC<DatePickerProps>} The DatePicker component.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  closeDatePicker,
}) => {
  // State and ref hooks for managing date picker state and interactions
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [isOpen, setIsOpen] = useState(true);

  // Definitions for days of the week and months
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

  // Generates a list of years for the dropdown selection
  const years = Array.from({ length: 105 }, (_, i) => currentYear - 100 + i);

  /**
   * Handles the navigation to the previous month.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event The mouse event.
   */
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

  /**
   * Generates the calendar view with days.
   *
   * @returns {JSX.Element} The calendar view with days.
   */
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
    <div ref={datePickerRef} className={styles.datePicker} role='dialog' aria-modal='true'>
      <div className={styles.header}>
        <button type='button' onClick={handlePreviousMonth} aria-label='Previous Month'>
          &lt;
        </button>
        <button type='button' onClick={handleToday} aria-label='Select Today'>
          🏠
        </button>
        <select
          value={currentMonth}
          onChange={(e) => setCurrentMonth(parseInt(e.target.value, 10))}
          aria-label='Select Month'
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={currentYear}
          onChange={(e) => setCurrentYear(parseInt(e.target.value, 10))}
          aria-label='Select Year'
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button type='button' onClick={handleNextMonth} aria-label='Next Month'>
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
      <div className={styles.calendar} role='grid'>
        {generateCalendar()}
      </div>
    </div>
  );
};

export default DatePicker;
