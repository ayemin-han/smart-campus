import React, { useEffect, useState } from "react";
import { Clock, MapPin, Users, ChevronRight } from "lucide-react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch initial events
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();

    // Connect WebSocket
    const socket = new SockJS("http://localhost:8080/ws-events");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/events", (message) => {
          const data = message.body;
          if (data.startsWith("deleted:")) {
            const id = parseInt(data.replace("deleted:", ""));
            setEvents((prev) => prev.filter((e) => e.eventId !== id));
          } else {
            const updatedEvent = JSON.parse(data);
            setEvents((prev) => {
              const index = prev.findIndex((e) => e.eventId === updatedEvent.eventId);
              if (index !== -1) {
                // Update existing
                const newEvents = [...prev];
                newEvents[index] = updatedEvent;
                return newEvents;
              } else {
                // Add new
                return [...prev, updatedEvent];
              }
            });
          }
        });
      },
    });

    client.activate();

    return () => client.deactivate();
  }, []);

  return (
    <div className="section-card">
      <div className="section-header-with-action">
        <h2>Upcoming Events</h2>
        <button className="link-btn">
          View All <ChevronRight size={16} />
        </button>
      </div>
      <div className="events-list">
        {events.map((event) => (
          <div key={event.eventId} className="event-item">
            <div className="event-content">
              <h3>{event.title}</h3>
              <div className="event-details">
                <div className="event-detail">
                  <Clock size={16} />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="event-detail">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                <div className="event-detail">
                  <Users size={16} />
                  <span>{event.admin?.name || "N/A"} organizing</span>
                </div>
              </div>
            </div>
            <div className="event-category">{event.type}</div>
            <button className="btn-secondary small">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
