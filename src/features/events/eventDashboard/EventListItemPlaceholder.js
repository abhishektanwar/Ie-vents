import React from 'react'
import { Button, Placeholder, Segment } from 'semantic-ui-react'

function EventListItemPlaceholder() {
	return (
		<Placeholder fluid>
			<Segment.Group>
				<Segment>
					<Placeholder>
						<Placeholder.Header image>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
						<Placeholder.Paragraph>
							<Placeholder.Line />
						</Placeholder.Paragraph>
					</Placeholder>
				</Segment>
				<Segment>
					<Placeholder>
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder>
				</Segment>
				<Segment clearing>
					<Button disabled color='blue' floated="right" content="View" />
				</Segment>
			</Segment.Group>
		</Placeholder>
	)
}

export default EventListItemPlaceholder