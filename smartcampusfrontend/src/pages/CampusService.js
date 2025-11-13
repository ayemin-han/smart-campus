// src/pages/CampusServices.js
import GoHomeButton from '../Button/GoHomeButton';

const services = [
  { name: 'Library', description: 'Access books, e-books, and study spaces.' },
  { name: 'IT Support', description: 'Get help with devices, software, and network issues.' },
  { name: 'Gym & Fitness', description: 'Workout facilities and fitness classes.' },
  { name: 'Counseling', description: 'Personal and academic support services.' },
  { name: 'Transport', description: 'Campus shuttle schedules and parking info.' },
];

const CampusService = () => {
  return (
    <div className="page-container">
      <h1 style={{fontSize: '2rem',fontWeight: '700', color: '#000000',}}>Campus Services</h1>
      <p className="page-subtitle">Explore all services available on campus</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      <GoHomeButton />
    </div>
  );
};

export default CampusService;
