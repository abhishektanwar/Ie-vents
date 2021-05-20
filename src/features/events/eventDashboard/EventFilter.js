import React from 'react'
import { Header, Menu } from 'semantic-ui-react'
import Calendar from 'react-calendar'
function EventFilter() {
	return (
		<>
			<Menu vertical size="large" style={{width:'100%'}}>
				<Header icon='filter' attached color = 'teal' content="Filters" />
				<Menu.Item content="All Events"/>
				<Menu.Item content="I am going"/>
				<Menu.Item content="I am hosting"/>
			</Menu>
			<Header icon="calendar" attached color="teal" content="Select date"/>
			<Calendar />
		</>
	)
}

export default EventFilter
