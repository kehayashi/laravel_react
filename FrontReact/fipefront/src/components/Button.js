import Button from 'react-bootstrap/Button';

const ButtonComponent = ({
    classColor,
    textButton,
    onClick
}) => {
  return (
    <div className='p-2'>
        <Button 
          variant={classColor} 
          onClick={onClick}>{textButton}
        </Button>
    </div>
  )
}

export default ButtonComponent