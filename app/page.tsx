'use client';

import { Badge } from '@/components/ui/badge';
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { FreeGemForm } from './components/free-gem-form';
import { Button } from '@/components/ui/button';

const MAX_SPIN_SPEED = 2000;

// Random username generator
const usernames = [
  'Player123',
  'GemHunter',
  'ClashMaster',
  'LuckyWinner',
  'GemCollector',
  'ProGamer',
  'Winner99',
  'GemKing',
  'LuckyPlayer',
  'ClashPro',
  'GemSeeker',
  'Winner2024',
  'ProClasher',
  'GemLord',
  'LuckyGem',
];

function getRandomUsername(): string {
  return usernames[Math.floor(Math.random() * usernames.length)];
}

function getRandomGemCount(): number {
  return Math.floor(Math.random() * 999) + 2; // 2-1000
}

// Component for gem with badge - each instance gets its own random number
function GemWithBadge() {
  // useState with lazy initializer ensures the random number is only generated once
  const [badgeNumber] = useState(() => Math.floor(Math.random() * 1000));

  return (
    <div className='relative'>
      <Badge className='absolute top-2 left-5 p-4 text-xl'>{badgeNumber}</Badge>
      <Image
        src='/gem.webp'
        alt='FREE GEMs'
        width={200}
        height={200}
        loading='lazy'
      />
    </div>
  );
}

export default function Home() {
  const [marqueeSpeed, setMarqueeSpeed] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gemsWon, setGemsWon] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function scheduleNextToast() {
      const delay = Math.floor(Math.random() * 6000) + 2000; // 2-8 seconds in milliseconds

      timeoutRef.current = setTimeout(() => {
        const username = getRandomUsername();
        const gemCount = getRandomGemCount();
        toast.success(`${username} won ${gemCount} gem!`);
        scheduleNextToast(); // Schedule the next toast
      }, delay);
    }

    // Start the first toast
    scheduleNextToast();

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleSpinClick() {
    setIsSpinning(true);
    const start = performance.now();
    const duration = 5000; // 5 seconds

    function animate(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1); // normalized [0,1]
      const speed = Math.round(MAX_SPIN_SPEED * (1 - t));
      setMarqueeSpeed(speed);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setGemsWon((prev) => (prev += Math.floor(Math.random() * 1000)));
        setMarqueeSpeed(0);
        setIsSpinning(false);
      }
    }

    setMarqueeSpeed(MAX_SPIN_SPEED);
    requestAnimationFrame(animate);
  }

  return (
    <div className='space-y-5'>
      <h1>
        <span className='text-destructive'>FREE</span> CLASH OF CLANS{' '}
        <span className='text-primary'>GEMS!</span>
      </h1>
      <Marquee>
        <MarqueeContent pauseOnHover={false}>
          <MarqueeItem className='select-none'>
            <Image
              src='/gem.webp'
              alt='FREE GEMs'
              width={50}
              height={50}
              loading='lazy'
            />
          </MarqueeItem>
        </MarqueeContent>
      </Marquee>
      <p>
        my dad work at clash of clans and he set it up so that i can add any
        gems to your accont!
      </p>

      <h2>GEMS YOU WON: {gemsWon}</h2>
      <div className='w-full border-24 border-primary'>
        <div className='relative overflow-hidden p-8'>
          <Marquee>
            <MarqueeContent speed={marqueeSpeed} pauseOnHover={false}>
              <MarqueeItem className='select-none'>
                <GemWithBadge />
              </MarqueeItem>
            </MarqueeContent>
            <MarqueeFade side='left' />
            <MarqueeFade side='right' />
          </Marquee>

          <div className='absolute top-0 left-1/2 w-2 h-96 bg-primary z-10' />
        </div>
      </div>

      <FreeGemForm onSpin={handleSpinClick} isSpinning={isSpinning} />

      <Button disabled={isSpinning || gemsWon <= 0}>put gem in account</Button>
    </div>
  );
}
