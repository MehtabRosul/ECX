
'use client'

import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

export function ProductQuickExplorer() {
  return (
    <section className="py-12 sm:py-24 bg-surface-2">
        <div className="container max-w-3xl">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <Input 
                    type="search"
                    placeholder='Search products, e.g., "threat detection API", "crypto SDK"'
                    className="w-full pl-12 pr-4 py-3 h-14 text-lg bg-surface-1 border-2 border-border focus:border-primary"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-muted" />
                </div>
            </div>
             <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-muted mr-2">Filters:</span>
                <button className="text-sm px-3 py-1 rounded-full bg-glass-01 border border-white/10 hover:bg-white/5 transition-colors">Status: Active</button>
                <button className="text-sm px-3 py-1 rounded-full bg-glass-01 border border-white/10 hover:bg-white/5 transition-colors">Platform: API</button>
                <button className="text-sm px-3 py-1 rounded-full bg-glass-01 border border-white/10 hover:bg-white/5 transition-colors">Tags: PQC</button>
            </div>
        </div>
    </section>
  )
}
