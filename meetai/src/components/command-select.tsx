import { useState, ReactNode } from "react"
import { ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandResponsiveDialog,
} from "@/components/ui/command"

interface Props {
  options: Array<{
    id: string
    value: string
    children: ReactNode
  }>
  onSelect: (value: string) => void
  onSearch: (value: string) => void
  value: string
  placeholder?: string
  isSearchable?: boolean
  className?: string
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder,
  className,
  isSearchable = true,
}: Props) => {
  const [open, setOpen] = useState(false)

  const selectOption = options.find((option) => option.value === value)

  return (
    <>
      {/* Button that opens/closes command menu */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn(
          "h-9 justify-between font-normal px-2 w-full",
          !selectOption && "text-muted-foreground",
          className,
        )}
      >
        <span>{selectOption?.children ?? placeholder ?? "Select option"}</span>
        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {/* Responsive Dialog/Drawer */}
      <CommandResponsiveDialog
        shouldFilter={!onSearch} // Disable built-in filtering if using custom search
        open={open}
        onOpenChange={setOpen}
        title="Select Option"
        description="Choose an option from the list below"
      >
        {isSearchable && (
          <CommandInput
            placeholder="Search..."
            onValueChange={onSearch}
            className="h-9"
          />
        )}
        <CommandList>
          <CommandEmpty>No option found</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => {
                  onSelect(option.value)
                  setOpen(false)
                }}
              >
                {option.children}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandResponsiveDialog>
    </>
  )
}