
const Logo = ({ className }: { className?: string }) => (
  <div aria-label="EncryptArx Homepage" className={`flex items-center font-headline text-xl font-bold ${className}`}>
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary mr-2">
        <span className="text-lg font-bold text-primary-foreground">E</span>
    </div>
    EncryptArx
  </div>
);
export default Logo;
