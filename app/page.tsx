import ThemeSwitch from '@/app/components/themeSwitch';

export default function Home() {
  return (
    <div>
      <main>
          <div className='flex items-center justify-between space-x-4 '>
 
      <ThemeSwitch />
    </div>
        Hello World!
      </main>
    </div>
  );
}
