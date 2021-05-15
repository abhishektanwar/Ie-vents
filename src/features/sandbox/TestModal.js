import React from 'react'
import ModalWrapper from '../../app/common/modals/ModalWrapper'

function TestModal({data}) {
	return (
		<ModalWrapper size='mini' header ='test header'>
			<div>This is data : {data}</div>
		</ModalWrapper>
	)
}

export default TestModal
