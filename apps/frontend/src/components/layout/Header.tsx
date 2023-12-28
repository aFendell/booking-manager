import { Button } from 'components/ui/Button';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 w-full items-center justify-between'>
        <h1>Header</h1>
        <Button>Button</Button>
      </div>
    </header>
  );
};

export default Header;
