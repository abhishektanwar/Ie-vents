import { Route } from 'react-router';
import { Button, Container } from 'semantic-ui-react'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import EventDetailedPage from '../../features/events/eventDetails/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';

function App() {


	return (
		<>
			<ModalManager />
			<Route exact path='/' component={() => <HomePage />} />
			<Route path={'/(.+)'}
				render={()=>(
					<>
						<NavBar />
						<Container className="main">
							<Route exact path='/events' component={()=>(<EventDashboard />)} />
							<Route exact path='/sandbox' component={()=>(<Sandbox />)} />
							<Route path='/events/:id' component={EventDetailedPage} />
							<Route path={['/createEvent','/manage/:id' ]}component={EventForm} />
							{/* <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} selectEvent={handleSelectEvent} selectedEvent={selectedEvent} /> */}
						</Container>
					</>
					
				)}
			/>
			
			
		
		</>
	);
}

export default App;
