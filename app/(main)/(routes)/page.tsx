import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div>
      <p className='text-3xl font-bold text-indigo-500'>
        Hello Discord
      </p>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>

  )
}
