import * as React from "react"

import { cn } from "@/lib/utils"

const Select = React.forwardRef(({options, name, className, ...props }, ref) => {
    return (
      <select
        className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        ref={ref}
        {...props}>
        <option key={""} value={""}>Seleccionar</option>
        {options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.text}
          </option>
        ))}
      </select>
    )
  })

  Select.displayName = "Select"

  export { Select }