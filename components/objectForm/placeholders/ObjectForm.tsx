import Placeholder from '@/client/Placeholder'
import PlaceholderButton from '@/client/PlaceholderButton'
import Row from '@/client/Row'
import FormBootstrap from '@/client/FormBootstrap'

export default function ObjectFormPlaceholder() {
	return <Placeholder as={FormBootstrap} animation='glow'
		className='shadow p-3 mb-5 bg-body rounded'>
    <Row>
      <PlaceholderButton variant='outline-secondary' sm={2} size='lg'
      	className='mb-3 me-2' />
      <PlaceholderButton variant='outline-secondary' sm={6} size='lg'
      	className='mb-3 me-2' />
    </Row>
    <Row>
      <Placeholder br='secondary' sm={1} size='lg' className='mb-3 me-2' />
      <PlaceholderButton variant='outline-secondary' sm={5} size='lg'
      	className='mb-3 me-2' />
    </Row>
    <Row>
      <PlaceholderButton variant='outline-secondary' sm={8} size='lg'
      	className='mb-3 me-2' />
    </Row>
    <Row>
      <PlaceholderButton sm={1} variant='outline-primary'
      	className='mb-3 me-2' />
    </Row>
  </Placeholder>
}
