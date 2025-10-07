import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"

const testimonials = [
  {
    quote: "EncryptArx has revolutionized our security posture. Their tools are both powerful and incredibly easy to integrate. A must-have for any security-conscious organization.",
    name: "Sarah Johnson",
    title: "CTO, SecureCo",
    avatarId: "testimonial-1",
  },
  {
    quote: "The performance and reliability of EncryptArx's infrastructure are second to none. We've seen a significant reduction in latency and a massive boost in developer productivity.",
    name: "Michael Chen",
    title: "Head of Engineering, InnovateTech",
    avatarId: "testimonial-2",
  },
  {
    quote: "Working with the EncryptArx team has been a fantastic experience. Their expertise in cryptography is unparalleled, and their support is always responsive and helpful.",
    name: "David Lee",
    title: "CEO, DataProtect",
    avatarId: "testimonial-3",
  },
]

function getAvatar(id: string) {
    return PlaceHolderImages.find(p => p.id === id);
}

export function Testimonials() {
  return (
    <section className="bg-muted/30 py-12 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">What our customers are saying</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Hear what our customers have to say about EncryptArx.
            </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatar = getAvatar(testimonial.avatarId);
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full bg-card/80 backdrop-blur-sm">
                      <CardContent className="flex flex-col justify-between h-full p-6">
                        <blockquote className="text-foreground/80 mb-6 flex-grow">“{testimonial.quote}”</blockquote>
                        <div className="flex items-center gap-4">
                            {avatar && (
                                <Avatar className="h-12 w-12">
                                    <Image
                                        src={avatar.imageUrl}
                                        alt={testimonial.name}
                                        width={48}
                                        height={48}
                                        data-ai-hint={avatar.imageHint}
                                        className="rounded-full"
                                    />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="ml-12"/>
          <CarouselNext className="mr-12"/>
        </Carousel>
      </div>
    </section>
  )
}
