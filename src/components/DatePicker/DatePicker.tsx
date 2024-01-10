import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './datePicker.module.css';

type DatePickerProps = {
  selectedDate: Date;
  onDateChange: (newDate: Date) => void;
  closeDatePicker: () => void;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  closeDatePicker,
}) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  // État pour le mois et l'année actuels
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const [isOpen, setIsOpen] = useState(true);

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

  // Générer une liste d'années pour la sélection
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  // Gestion du changement de mois
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

  // Fonction pour revenir à la date d'aujourd'hui
  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    onDateChange(today);
  };

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Fonction appelée lorsqu'une journée est sélectionnée
  const selectDate = (day: number) => {
    // Crée une nouvelle date avec le jour sélectionné
    const newDate = new Date(currentYear, currentMonth, day);

    // Ajuste pour le décalage horaire
    const timezoneOffset = newDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(newDate.getTime() - timezoneOffset);

    // Appelle onDateChange avec la date ajustée
    onDateChange(adjustedDate);
    closeDatePicker();
  };

  // Logique pour générer le calendrier
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    const today = new Date();

    // Ajoute des divs vides si le premier jour du mois n'est pas un dimanche
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.day} />);
    }

    // Ajoute les jours du mois
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

  // Fonction pour fermer le DatePicker si le clic est en dehors de celui-ci
  const handleCloseOnOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        closeDatePicker();
      }
    },
    [closeDatePicker]
  );

  useEffect(() => {
    // Ajoute l'EventListener lorsque le DatePicker est ouvert
    window.addEventListener('mousedown', handleCloseOnOutsideClick);

    // Nettoie l'EventListener
    return () => {
      window.removeEventListener('mousedown', handleCloseOnOutsideClick);
    };
  }, [handleCloseOnOutsideClick]);

  if (!isOpen) return null;

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
