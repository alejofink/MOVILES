import { EventCard } from "./tarjeta";

function App() {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <EventCard
        title="Concierto de Rock"
        date="2025-10-20"
        location="Estadio Central"
        attendees={120}
        category="music"
      />
      <EventCard
        title="Hackathon"
        date="2025-11-05"
        location="Tech Hub"
        attendees={50}
        category="tech"
      />
      <EventCard
        title="Feria Gastronómica"
        date="2025-12-10"
        location="Plaza Mayor"
        attendees={200}
        category="food"
      />
      <EventCard
        title="Maratón de Ciudad"
        date="2025-10-30"
        location="Parque Central"
        attendees={300}
        category="sports"
      />
    </div>
  );
}

export default App;
