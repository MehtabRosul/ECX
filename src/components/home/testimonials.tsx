
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import { PlaceHolderImages } from "@/lib/placeholder-images";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    imgId: "avatar-jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    imgId: "avatar-jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    imgId: "avatar-john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    imgId: "avatar-jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    imgId: "avatar-jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    imgId: "avatar-james",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

function getAvatar(id: string) {
    return PlaceHolderImages.find(p => p.id === id);
}

const ReviewCard = ({
  imgId,
  name,
  username,
  body,
}: {
  imgId: string
  name: string
  username: string
  body: string
}) => {
  const avatar = getAvatar(imgId);
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-border/20 bg-surface-2 hover:bg-surface-2/70"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {avatar && <img className="rounded-full" width="32" height="32" alt={name} src={avatar.imageUrl} />}
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-high">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-muted">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-high/80">{body}</blockquote>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section className="py-12 sm:py-24 bg-surface-1">
        <div className="container">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">What Our Users Say</h2>
            </div>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="from-surface-1 pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
                <div className="from-surface-1 pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
            </div>
        </div>
    </section>
  )
}
