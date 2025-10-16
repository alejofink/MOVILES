import React from "react";

export interface EventCardProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  category: 'music' | 'sports' | 'tech' | 'food';
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  attendees,
  category
}) => {
  const categoryColors: Record<EventCardProps['category'], string> = {
    music: 'purple',
    sports: 'green',
    tech: 'blue',
    food: 'orange',
  };

  return (
    <div style={{
      backgroundColor: categoryColors[category],
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      width: '220px',
      margin: '10px'
    }}>
      <h2>{title}</h2>
      <p><strong>Fecha:</strong> {date}</p>
      <p><strong>Lugar:</strong> {location}</p>
      <p>👥 {attendees} asistentes</p>
    </div>
  );
};
