"use client"

import { useImageStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import type { UserInputItemType } from "@/lib/types"
import { Loader2, Download } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { downloadImage, generateFilename } from "@/lib/download-utils"

interface UserInputItemProps {
  input: UserInputItemType
}

export function UserInputItem({ input }: UserInputItemProps) {
  const { updateUserInput } = useImageStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
      <Input
        value={input.prompt}
        onChange={(e) => updateUserInput(input.id, e.target.value)}
        placeholder="ユーザーインプット"
      />

      <div className="h-[150px] relative border rounded-md overflow-hidden">
        {input.status === "idle" && (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">待機中</div>
        )}

        {input.status === "pending" && (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-full w-full" />
          </div>
        )}

        {input.status === "processing" && (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            {input.progressMessage && (
              <p className="text-sm text-muted-foreground mt-2 px-2 text-center">
                {input.progressMessage}
              </p>
            )}
          </div>
        )}

        {input.status === "completed" && input.imageUrl && (
          <>
            <Image src={input.imageUrl || "/placeholder.svg"} alt={input.prompt} fill className="object-cover" />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 z-10"
              onClick={() => downloadImage(input.imageUrl!, generateFilename(`image_${input.id}`))}
            >
              <Download className="h-4 w-4" />
            </Button>
          </>
        )}

        {input.status === "error" && (
          <div className="flex items-center justify-center h-full text-sm text-destructive p-2 text-center">
            エラー: {input.errorMessage || "画像生成に失敗しました"}
          </div>
        )}
      </div>
    </div>
  )
}
